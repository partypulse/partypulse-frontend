import React, {useState} from "react";
import api from "../../api/api.js";

function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const login=()=>{api.post("/login", {email:email, password:password})
        .then(response=> {
            window.alert('login success' + response.data.token)
            console.log(response.data)
        })
        .catch( error=> console.error(error))}


    return( <div> <h1> Logga in </h1>
    <div>
    <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
    <input type="text" value={password} onChange={e=>setPassword(e.target.value)}/>
    <button onClick={login}>Logga in</button>
    </div>

    </div> )
}

export default LoginPage;