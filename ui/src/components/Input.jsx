import { useState } from "react"

export default function Input({type, value, setValue, children}) {

    const isTextArea = type === 'textarea'
    const [isFocused, setIsFocused] = useState(false)

    const id = children.toLowerCase().replace(" ", "-")

    return (
        <div className={`input ${isFocused || value ? 'input--focused' : ''} ${isTextArea ? 'input--textarea' : ''}`} >
            {
                isTextArea ? 
                    <textarea id={`input-${id}`} onChange={e => setValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}></textarea>
                :
                    <input type={type} id={`input-${id}`} onChange={e => setValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
            }
            <label htmlFor={id}>{children}</label>
        </div>
    )
}