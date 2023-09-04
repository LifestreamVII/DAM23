import { useState } from "react"
import arrowGrey from '../assets/images/arrow-grey.svg'

export default function Input({type, value, setValue, children, options, multiple}) {

    const types = ['textarea', 'file', 'select']
    const inputType = types.includes(type) ? type : 'default'

    const view = {
        default: <DefaultInput type={type} value={value} setValue={setValue} label={children} />,
        textarea: <InputTextArea value={value} setValue={setValue} label={children} />,
        file: <InputFile value={value} setValue={setValue} label={children} />,
        select: <InputSelect value={value} setValue={setValue} label={children} options={options} multiple={multiple}/>
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

function InputSelect({value, setValue, label, options, multiple}) {

    const [isFocused, setIsFocused] = useState(false)

    function toggleIsFocused(e) {
        setIsFocused(!isFocused)
    }

    options = options || []

    return (
        <div className={`input input--select ${!isFocused ? 'input--closed' : ''}`}>
            <button className="label input__item" onClick={toggleIsFocused} type="button">
                <span className="label__name">{label} ({options.length})</span>
                <img className="label__arrow" src={arrowGrey} alt="" />
            </button>
            <div className="options">
                {options.length ?
                    options.map((option, index) => 
                        <button
                            type="button"
                            className={`option input__item ${
                                multiple ?
                                    value.includes(option.value) ? 'option--selected' : ''
                                : value === option.value ? 'option--selected' : ''
                            }`}
                            key={index}
                            onClick={() => setValue(option.value)}
                        >{option.text}</button> 
                    )
                : <button type="button" className="option input__item">Aucun résultat</button>
                }
            </div>
        </div>
    )
}