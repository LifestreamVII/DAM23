import { useState, useRef } from 'react'
import arrowGrey from '../assets/images/arrow-grey.svg'

type FilterProps = {
    id: number,
    options: string[],
    name: string,
    openSelectId: number | null,
    handleSetOpenSelectId: (id: number | null) => void,
}

export default function Filter(props: FilterProps) {

    const {id, options, name, openSelectId, handleSetOpenSelectId} = props

    const filterWrapper = useRef<HTMLDivElement>(null)
    const [currentOptions, setCurrentOptions] = useState<string[]>([])

    function handleSetCurrentOption(option: string) {
        if (currentOptions.includes(option)) {
            setCurrentOptions((prev) => prev.filter((item) => item != option))
            return
        }
        console.log(currentOptions)
        setCurrentOptions((prev) => [...prev, option])
    }

    return (
        <div ref={filterWrapper} className={`select ${openSelectId == id ? 'select--open' : null}`}>
            <button className="option" onClick={() => handleSetOpenSelectId(id)}>
                <span className="option__name">{name}</span>
                <img className="option__arrow" src={arrowGrey} alt="" />
            </button>
            <div className="select__options">
                {options.map((option, index) =>
                <button key={index} className="option" onClick={() => handleSetCurrentOption(option)}>
                    <input type="checkbox" checked={currentOptions.includes(option)} />
                    <span className="option__name">{option}</span>
                </button>
                )}
            </div>
        </div>
    )
}