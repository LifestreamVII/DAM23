import arrow from '../assets/images/arrow.svg'

type RegisterProps = {
    type: "login" | "signup"
}

export default function Register({type}: RegisterProps) {

    return (
        <div className="register">
            <section className="register__content">
                <a href="/" className="register__arrow">
                    <img src={arrow} alt="" />
                </a>
                <form action="" className="register__form">
                    <h1 className="register__title">{type}</h1>
                    <div className="register__input">
                        <input type="mail" id="register-mail" />
                        <label htmlFor="register-mail">Email</label>
                    </div>
                    <div className="register__input">
                        <input type="password" id="register-password" placeholder="" />
                        <label htmlFor="register-password">Mot de passe</label>
                    </div>
                    <button className="register__button" type="submit">{type}</button>
                    <p className="register__redirect">Pas encore de compte ? <a href={`/${type === 'login' ? 'signup' : 'login'}`}>{type === 'login' ? 'signup' : 'login'}</a></p>
                </form>
            </section>
            <div className="register__background">
            </div>
        </div>
    )
}