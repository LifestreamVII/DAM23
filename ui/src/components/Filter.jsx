import { useState, useRef } from 'react'
import arrowGrey from '../assets/images/arrow-grey.svg'

export default function Filter(props) {

    const {id, name, tags, openSelectId, handleSetOpenSelectId, tagsSelected, handleSetTagsSelected} = props

    const filterWrapper = useRef(null)

    return (
        <div ref={filterWrapper} className={`select ${openSelectId === id ? 'select--open' : null}`}>
            <button className="option" onClick={() => handleSetOpenSelectId(id)}>
                <span className="option__name">{name}</span>
                <img className="option__arrow" src={arrowGrey} alt="" />
            </button>
            <div className="select__options">
                {tags.map((tag, index) =>
                <button key={index} className="option" onClick={() => handleSetTagsSelected(name, tag)}>
                    <input type="checkbox" checked={tagsSelected[name] ? tagsSelected[name].includes(tag) : false} readOnly />
                    <span className="option__name">{tag}</span>
                </button>
                )}
            </div>
        </div>
    )
}