import arrow from '../assets/images/arrow.svg'
import useGetJWT from '../hooks/useGetJWT'
import { useState } from 'react'
import useCreateUser from '../hooks/useCreateUser'

export default function Register({type}) {

    const getJWT = useGetJWT()
    const createUser = useCreateUser()

    const username = 'johndoe'
    const mail = 'johndoe@mail.com'
    const password = 'password'

    // getJWT(mail, password).then(data => {
    //     console.log(data)
    // })

    createUser(password, mail).then(data => {
        console.log(data)
    })

    function handleSubmit(e) {
        e.preventDefault()
        console.log('submit')
    }

    return (
        <div className="register">
            <section className="register__content">
                <a href="/" className="register__arrow">
                    <img src={arrow} alt="" />
                </a>
                <form action="" className="register__form" onSubmit={handleSubmit()}>
                    <h1 className="register__title">{type}</h1>
                    <div className="register__input">
                        <input type="mail" id="register-mail" />
                        <label htmlFor="register-mail">Email</label>
                    </div>
                    <div className="register__input">
                        <input type="password" id="register-password" placeholder="" />
                        <label htmlFor="register-password">Mot de passe</label>
                    </div>
                    <button className="btn" type="submit">{type}</button>
                    <p className="register__redirect">Pas encore de compte ? <a href={`/${type === 'login' ? 'signup' : 'login'}`}>{type === 'login' ? 'signup' : 'login'}</a></p>
                </form>
            </section>
            <div className="register__background">
            </div>
        </div>
    )
}