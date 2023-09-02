import { useEffect } from 'react'
import iconInfo from '../assets/images/icon-info.svg'

export default function MessageBox({message, setMessage}) {

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 5000)
    }, [])

    return (
        <div className="message-box">
            <img className="message-box__icon" src={iconInfo} alt="" />
            <p className="message-box__text">{message}</p>
        </div>
    )
}