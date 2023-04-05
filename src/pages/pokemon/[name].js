import {useRouter} from "next/router"
import useSWR from "swr"
import Head from "next/head"
import {Container, Row, Col} from "react-bootstrap"
// import fs from "fs"


// const pokemonDir = "/pokemon/"
const fetcher = 
    async (endpoint) => fetch(`http://localhost:3000${endpoint}`)
        .then(res=>res.json())
        .then(res=>res)

//difference between async getPokemon
//and no async?
const getPokemon = async (name) =>{

    console.log("In getPokemon " +name)
    const myAPI = `/api/pokemon`
    const pokemon = `?name=${name}`
    const myEndpoint = myAPI+pokemon

    const {data, error} = await useSWR(myEndpoint,fetcher)

    if (error) return null
    return data
}

// export async function getStaticPaths(){
//     const fileNames = fs.readdirSync()
//     console.log("Poop")
// }

export async function getServerSideProps({params}){
    const data = await getPokemon(params.name)

    return {
        props: {
            data
        }
    }
}

// export async function getStaticProps(){}

export default  () => {
    
    // const data = getPokemon()
    const {data, error} =  useSWR(myEndpoint,fetcher)

    return<><div>
        <Head>
            <title>{data && data.name.english || "Pokemon"}</title>
        </Head>
   
    <Container>
        {data && <>
        <h1><div>{data.name.english}</div></h1>
        <Row>
            <Col xs={4}>
                 <img src={`/pokemon/${data.name.english.toLowerCase().replace(" ", "-")}.jpg`} style={{width: "100%"}} alt="" />
            </Col>
            <Col xs={8}>
                {Object.entries(data.base).map(([key,value])=>
                    {
                        return <Row key={key}>
                                    <Col xs={2}>{key}</Col>
                                    <Col xs={10}>{value}</Col>
                                </Row>
                    })
                }
            </Col>
        </Row>
              </>  }
    </Container> 
    </div> 
    
    </>
}