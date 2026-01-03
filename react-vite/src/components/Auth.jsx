import { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import './Auth.css';

function Auth(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();

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

    const login = (e) => {
        e.preventDefault();

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
        const validSessionCookie = document.cookie.split(';').find((row) => row.startsWith('validSession')).split('=');
        
        if(validSessionCookie[1] == 'true') {
            navigate('/coffees');
        }
    }, [navigate]);
    

    return (
        <div id="auth-wrapper">
            <form id="auth-form">
                <label>
                    <span>Username</span>
                    <input 
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                { formErrors.username && <p className="form-error">{formErrors.username}</p> }
                <label>
                    <span>Password</span>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                { formErrors.password && <p className="form-error">{formErrors.password}</p> }
                { formErrors.auth && <p className="form-error">{formErrors.auth}</p> }
                <div className="form-controls">
                    <button type="submit" onClick={login}>Login</button>
                    <a onClick={register}>Register</a>
                </div>
            </form>
        </div>
    )
}

export default Auth;