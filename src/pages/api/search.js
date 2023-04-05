import pokemon from "../../../public/pokemon.json"


export default ((req,res)=>{

    const filter = req.query.q ? new RegExp(req.query.q,"i") : /.*/

    res.setHeader("Content-Type", "application/json")
    res.status(200).json(
        JSON.stringify(pokemon.filter(
            ({name:{english}})=> english.match(filter)).slice(0,10)
            )
    )
})