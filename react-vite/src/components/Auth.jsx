import { useState } from "react";
import './Auth.css';

function Auth(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
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
        .then(data => data.errors ? setFormErrors(data.errors) : setOutput(data));
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
        .then(data => data.errors ? setFormErrors(data.errors) : setOutput(data));
    }

    return (
        <div className="auth">
            <input type="text"
             placeholder="username"
             value={username}
             onChange={e => setUsername(e.target.value)}
            />
            { formErrors.username && <p className="form-error">{formErrors.username}</p> }
            <input type="password"
             placeholder="password"
             value={password}
             onChange={e => setPassword(e.target.value)}
            />
            { formErrors.password && <p className="form-error">{formErrors.password}</p> }
            { formErrors.auth && <p className="form-error">{formErrors.auth}</p> }
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <p style={{color:"black"}}>{output.id} {output.username}</p>
        </div>
    )
}

export default Auth;