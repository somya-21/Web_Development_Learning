const express=require('express')

const app=express()
const checkpassword=require('./checkpassoword_middleware')
//crate a token

let mytoken='12345'
let checkToken=(req,res,next)=>
{
    if(req.query.token==" "||req.query.token==undefined)
    {
        return res.send(`<h1>Plese enter the token</h1>`)
    }
     if(req.query.token!= mytoken)
    {
        return res.send(`<h1>Enter correct token <h1>`)
    }
    next();
}




app.get("/",(req,res,next)=>
{
    res.send(`<h1>Welcome Page</h1>`)
})
// app.use(checkToken,checkpassword)
app.get("/login",checkpassword,(req,res,next)=>
{
    res.send(`<h1>login successfully</h1>`)
})
app.get("/products",checkToken,(req,res,next)=>
{
    res.send(`<h1>Welcome product page</h1>`)
})

app.listen(3000,console.log('Server runing'))