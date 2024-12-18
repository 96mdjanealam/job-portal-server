/*
-------------------
JWT
-------------------
1. install Jsonwebtoken cookdie-parser
run the command >> npm i jsonwebtoken cookie-parser

2. set cookieParser as middleware
```app.use(cookieParser());```

3. Create a token
- enable a node tarminal
-run the command>> require('crypto').randomBytes(64).toString('hex')
- copy any random given string values without ""
- paste the value to ACCESS_TOKEN_SECRET in env. file
- make post operation in index.js
```
   app.post("/jwt", (req,res)=>{
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "5h"});
            res.cookie("token", token, {
                httpOnly: true,
                secure: false
            })
            .send({success:true})
        })
```
4. send the token to the client side
- modify the cors middleware
```
app.use(cors({
    origin:["http://localhost:5173"],
    credentials: true
}));
```






*/
