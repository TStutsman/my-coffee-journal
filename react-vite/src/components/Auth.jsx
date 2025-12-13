import { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import './Auth.css';

function Auth(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

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
        .then(data => {
            if(data.errors) return setFormErrors(data.errors);

            navigate('/coffees');
        });
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
        .then(data => {
            if(data.errors) return setFormErrors(data.errors);

            navigate('/coffees');
        });
    }

    useEffect(()=> {
        const sessionExists = document.cookie.split(';').some((row) => row.startsWith('validSession'));
        if(sessionExists) {
            navigate('/coffees');
        }
    }, [navigate])
    

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
        </div>
    )
}

export default Auth;