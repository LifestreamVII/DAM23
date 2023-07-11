import { useState } from "react"
import Filter from "./Filter"

export default function Filters() {

    const [openSelectId, setOpenSelectId] = useState(null)

    function handleSetOpenSelectId(id) {
        openSelectId === id ? setOpenSelectId(null) : setOpenSelectId(id)
    }

    const filtersList = [
        {
            defaultOption: "instrument",
            options: ["instrument", "test", "test2"]
        },
        {
            defaultOption: "instrument",
            options: ["instrument", "test", "test2"]
        }
    ]

    return (
        <section className="filters border-bottom--space">
            { filtersList.map((filter, index) => 
                <Filter key={index} id={index} name={filter.defaultOption} options={filter.options} openSelectId={openSelectId} handleSetOpenSelectId={handleSetOpenSelectId} />
            )}
        </section>
    )
}