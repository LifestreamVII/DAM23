import { useState } from "react"

export default function Input({type, value, setValue, children}) {

    const inputType = type !== 'textarea' && type !== 'file' ? 'default' : type

    const view = {
        default: <DefaultInput type={type} value={value} setValue={setValue} label={children} />,
        textarea: <InputTextArea value={value} setValue={setValue} label={children} />,
        file: <InputFile value={value} setValue={setValue} label={children} />
    }[inputType];

    return view
}

function DefaultInput({type, value, setValue, label}) {
    const [isFocused, setIsFocused] = useState(false)
    const id = label.toLowerCase().replace(" ", "-")

    return (
        <div className={`input ${isFocused || value ? 'input--focused' : ''}`} >
            <input type={type} id={`input-${id}`} onChange={e => setValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

function InputFile({setValue, label}) {
    const [isFocused, setIsFocused] = useState(false)
    const id = label.toLowerCase().replace(" ", "-")

    function readFile(e) {
        e.preventDefault()

        const reader = new FileReader();
        const data = e.target.files && e.target.files[0];

        if (data) {
            reader.onloadend = () => {
                if (reader.result) setValue(`${reader.result.toString()}`);
            };
            reader.readAsDataURL(data);
        }
    }
    
    return (
        <div className="input input--focused">
            <input type='file' id={`input-${id}`} onChange={e => setValue(readFile(e))} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

function InputTextArea({value, setValue, label}) {
    const [isFocused, setIsFocused] = useState(false)
    const id = label.toLowerCase().replace(" ", "-")

    return (
        <div className={`input input--textarea ${isFocused || value ? 'input--focused' : ''}`} >
            <textarea id={`input-${id}`} onChange={e => setValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}></textarea>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}