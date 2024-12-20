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
5. in the client side update onAuthStateChanged function in auth provider.
```
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("user captured", currentUser);

      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios.post("http://localhost:5000/jwt", user, {withCredentials: true})
        .then(res=> console.log(res.data))
      }

      // put it in the right place
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  ```
  6. to clear the token cookie set a post req in server side
  ```
   app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: false,
        })
        .send({ success: true });
    });
    ```
    - call the api from client side into onAuthStateChanged function:
    ```
    if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post("http://localhost:5000/jwt", user, { withCredentials: true })
          .then((res) => console.log("login token", res.data));
      } else {
        axios
          .post(
            "http://localhost:5000/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => console.log("logout", res.data));
      }
          ```
          - place the setLoading correctly after login and logout operations
          ```
          .then((res) => {
            console.log("login token", res.data);
            setLoading(false);
          });
          ```
          and >>>>
        ```
         .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
          ```







*/
