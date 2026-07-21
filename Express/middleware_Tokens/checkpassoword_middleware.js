let password=11
let checkpassword=(req,res,next)=>
{
    if(req.query.password==" "||req.query.password==undefined)
    {
        return res.send(`<h1>Plese enter the passowrd</h1>`)
    }
     if(req.query.password!= password)
    {
        return res.send(`<h1>Enter correct passoword
             <h1>`)
    }
    next();
}
module.exports=checkpassword