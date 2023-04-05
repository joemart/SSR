import Head from "next/head"
import { useState } from "react"
import {Container, FormControl, Row, Col, Card} from "react-bootstrap"
import useSWR from "swr"
import Link from "next/link"


const URL = "http://localhost:3000/api/search?q="


const fetcher =  (q="")=>  fetch(`${URL}${q}`)
  .then( async res=> await res.json())
  .then(res => {
    return JSON.parse(res).map(pokemon=>({...pokemon,
    image: `./pokemon/${pokemon.name.english.toLowerCase().replace(" ", "-")}.jpg`
  }))
})

export default function Home() {

  const [query, setQuery] = useState("")
  const {data, error} = useSWR(query,fetcher)

  if(error) return <>ERROR</>

  return (
    <>
    
    
    <Head> <title>Pokemon</title> </Head>
    
    <Container>

      <FormControl
        placeholder="Search" 
        aria-label="Search"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        >
        
      </FormControl>
      <div>
        {console.log(JSON.stringify(data))}
        {data && (
          <Row>
            {(data).map(({id, name, type, image})=>{
              return <Col xs={4} key={id} style={{padding:5}}>
                  <Link href={`/pokemon/${name.english}`}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={image}
                      style={{maxheight:300}}
                    />

                    
                    <Card.Body>
                      <Card.Title>{name.english}</Card.Title>
                      <Card.Subtitle>{type.join(", ")}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                  </Link>
                 </Col>
            })}
          </Row>
        )}
      </div> 
       
    </Container>
    
    </>
  )
}

