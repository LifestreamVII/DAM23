import arrow from '../assets/images/arrow.svg'
import { useState } from 'react'
import useCreateUser from '../hooks/useCreateUser'
import MessageBox from '../components/MessageBox'
import Input from '../components/Input'

export default function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(false)
    
    const createUser = useCreateUser

    function handleSubmit(e) {
        e.preventDefault()
        createUser(username, email, password).then(data => {
            setMessage(data.message)
        })
    }

    return (
        <div className="register register--signup">
            <section className="register__content">
                <a href="/" className="register__arrow">
                    <img src={arrow} alt="" />
                </a>
                <form action="" className="register__form" onSubmit={handleSubmit}>
                    {message ? <MessageBox message={message} setMessage={setMessage} /> : null}
                    <h1 className="register__title">Signup</h1>
                    <Input type="text" setValue={setUsername} value={username}>
                        Nom d'utilisateur
                    </Input>
                    <Input type="mail" setValue={setEmail} value={email}>
                        Email
                    </Input>
                    <Input type="password" setValue={setPassword} value={password}>
                        Mot de passe
                    </Input>
                    <button className="btn" type="submit">Signup</button>
                    <p className="register__redirect">Déjà un compte ? <a href="/login">Login</a></p>
                </form>
            </section>
            <div className="register__background">
            </div>
        </div>
    )
}