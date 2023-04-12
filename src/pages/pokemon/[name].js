import {useRouter} from "next/router"
import useSWR from "swr"
import Head from "next/head"
import {Container, Row, Col} from "react-bootstrap"
    

const fetcher = 
    async (endpoint) => fetch(`http://localhost:3000${endpoint}`)
        .then(res=>res.json())

//difference between async getPokemon
//and no async?
const getPokemon = async (name) =>{
    const myAPI = `/api/pokemon`
    const pokemon = `?name=${name}`
    const myEndpoint = myAPI+pokemon
    const data = fetcher(myEndpoint)
    return data
}


export async function getServerSideProps({params:{name}}){
    return {
        props: {
            params :{
                data : await getPokemon(name)
            }
        }
    }
}



export default  ({params:{data}}) => {
//4710056

    return<>
    <div>
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