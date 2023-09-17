import arrow from '../assets/images/arrow.svg'
import { useState, useContext } from 'react'
import useGetJWT from '../hooks/useGetJWT'
import Input from '../components/Input'
import {userContext} from "../contexts/UserContext";
import { messageBoxContext } from '../contexts/MessageBoxContext'
import { Link } from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggedUser, setLoggedUser] = useContext(userContext);
    const [message, setMessage] = useContext(messageBoxContext);

    const getJWT = useGetJWT

    function handleSubmit(e) {
        e.preventDefault()
        getJWT(username, password).then(data => {
            setMessage(data.message)
            console.log(data)
            setLoggedUser(data.user)
        })
    }

    return (
        <div className="register">
            <section className="register__content">
                <Link to="/" className="register__arrow">
                    <img src={arrow} alt="" />
                </Link>
                <form action="" className="register__form" onSubmit={handleSubmit}>
                    <h1 className="register__title">Login</h1>
                    <Input type="text" setValue={setUsername} value={username}>
                        Nom d'utilisateur
                    </Input>
                    <Input type="password" setValue={setPassword} value={password}>
                        Mot de passe
                    </Input>
                    <button className="btn btn--secondary" type="submit">Login</button>
                    <p className="register__redirect">Pas encore de compte ? <Link to="/signup">Signup</Link></p>
                </form>
            </section>
            <div className="register__background">
            </div>
        </div>
    )
}