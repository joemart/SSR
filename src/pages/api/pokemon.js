import pokemon from "../../../public/pokemon.json"

export default ( (req, res) =>{
    console.log("In pokemon res")
    const pokemonName = req.query.name?.toLowerCase()
    // console.log("Pokemon name is "+pokemonName)
    //if no name
    if(pokemonName=="")
        return res.status(400).send({message:"Empty name"})
    else{
        
        const found = pokemon.filter(({name:{english}})=>{
            return english.toLowerCase()===pokemonName
        })
        // console.log(found)
        if (found.length === 0)
            return res.status(404).send({message:"Pokemon not found"})
        // function exits at res.status?
        // console.log(found)
        return res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json(found[0])
    }
    
    // return res.status(200).send({message:"pokemon!"})
} )