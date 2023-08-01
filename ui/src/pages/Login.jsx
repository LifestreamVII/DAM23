import arrow from '../assets/images/arrow.svg'
import { useState, useContext } from 'react'
import useGetJWT from '../hooks/useGetJWT'
import MessageBox from '../components/MessageBox'
import Input from '../components/Input'
import {userContext} from "../contexts/UserContext";

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(false)
    const [loggedUser, setLoggedUser] = useContext(userContext);
    
    const getJWT = useGetJWT

    function handleSubmit(e) {
        e.preventDefault()
        getJWT(email, password).then(data => {
            setMessage(data.message)
            console.log(data)
            setLoggedUser(data.user)
        })
    }

    return (
        <div className="register">
            <section className="register__content">
                <a href="/" className="register__arrow">
                    <img src={arrow} alt="" />
                </a>
                <form action="" className="register__form" onSubmit={handleSubmit}>
                    {message ? <MessageBox message={message} setMessage={setMessage} /> : null}
                    <h1 className="register__title">Login</h1>
                    <Input type="mail" setValue={setEmail} value={email}>
                        Email
                    </Input>
                    <Input type="password" setValue={setPassword} value={password}>
                        Mot de passe
                    </Input>
                    <button className="btn" type="submit">Login</button>
                    <p className="register__redirect">Pas encore de compte ? <a href="/signup">Signup</a></p>
                </form>
            </section>
            <div className="register__background">
            </div>
        </div>
    )
}