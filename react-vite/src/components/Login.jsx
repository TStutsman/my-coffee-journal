import { useState } from "react";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [output, setOutput] = useState("Try to login");

    const register = () => {
        fetch('/api/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        })
        .then(res => res.json())
        .then(data => setOutput(data));
    }

    const login = () => {
        fetch('/api/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        })
        .then(res => res.json())
        .then(data => Object.keys(data).length ? setOutput(data) : setOutput("not found"));
    }

    return (
        <div>
            <h1>Login screen</h1>
            <input type="text"
             placeholder="username"
             value={username}
             onChange={e => setUsername(e.target.value)}
            />
            <input type="password"
             placeholder="password"
             value={password}
             onChange={e => setPassword(e.target.value)}
            />
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <p style={{color:"black"}}>{output.id} {output.username}</p>
        </div>
    )
}

export default Login;