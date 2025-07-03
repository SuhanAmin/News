
const jwt=require('jsonwebtoken')
const cookieparser=require('cookie-parser')

function islogged(req,res,next){
  
  
    let token=req.cookies.token
   
    
    
     if (!token) {
    return res.status(401).json({ message: "Unnbnnauthorized: No token" });
  }
    const code=jwt.verify(token,process.env.JWT_SECRET)
    req.user=code
  
        next()
   
    
}
module.exports=islogged
