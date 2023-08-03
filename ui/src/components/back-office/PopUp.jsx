import cross from '../../assets/images/icon-cross.svg';
import { Link, useLocation } from "react-router-dom"

export default function PopUp({ children }) {

    const previousLocation = useLocation().state?.from
    const from = previousLocation || '/admin'
    
    return (
        <div className={`pop-up`}>
            <div className="pop-up__content">
                <Link to={from}>
                    <img className="pop-up__cross" src={cross} alt="" />
                </Link>
                {children}
            </div>
        </div>
    )
}