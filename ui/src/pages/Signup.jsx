import arrow from '../assets/images/arrow.svg'
import { useState } from 'react'
import useCreateUser from '../hooks/useCreateUser'
import MessageBox from '../components/MessageBox'

export default function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(false)
    
    const createUser = useCreateUser

    function handleSubmit(e) {
        e.preventDefault()
        createUser(username, email, password).then(data => {
            setMessage(data)
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
                    <div className="register__input">
                        <input type="text" id="register-username" onChange={e => setUsername(e.target.value)} />
                        <label htmlFor="register-username">Nom d'utilisateur</label>
                    </div>
                    <div className="register__input">
                        <input type="mail" id="register-mail" onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="register-mail">Email</label>
                    </div>
                    <div className="register__input">
                        <input type="password" id="register-password" placeholder="" onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="register-password">Mot de passe</label>
                    </div>
                    <button className="btn" type="submit">Signup</button>
                    <p className="register__redirect">Déjà un compte ? <a href="/login">Login</a></p>
                </form>
            </section>
            <div className="register__background">
            </div>
        </div>
    )
}