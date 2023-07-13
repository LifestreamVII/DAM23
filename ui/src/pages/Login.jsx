import arrow from '../assets/images/arrow.svg'
import { useState } from 'react'
import useGetJWT from '../hooks/useGetJWT'
import MessageBox from '../components/MessageBox'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(false)
    
    const getJWT = useGetJWT

    function handleSubmit(e) {
        e.preventDefault()
        getJWT(email, password).then(data => {
            setMessage(data.message)
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
                    <div className="register__input">
                        <input type="mail" id="register-mail" onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="register-mail">Email</label>
                    </div>
                    <div className="register__input">
                        <input type="password" id="register-password" placeholder="" onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="register-password">Mot de passe</label>
                    </div>
                    <button className="btn" type="submit">Login</button>
                    <p className="register__redirect">Pas encore de compte ? <a href="/signup">Signup</a></p>
                </form>
            </section>
            <div className="register__background">
            </div>
        </div>
    )
}