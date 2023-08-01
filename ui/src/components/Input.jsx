import { useState } from "react"

export default function Input({type, value, setValue, children}) {

    const [isFocused, setIsFocused] = useState(false)

    const id = children.toLowerCase().replace(" ", "-")

    return (
        <div className={`input ${isFocused || value ? 'input--focused' : ''}`} >
            <input type={type} id={`input-${id}`} onChange={e => setValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
            <label htmlFor={id}>{children}</label>
        </div>
    )
}