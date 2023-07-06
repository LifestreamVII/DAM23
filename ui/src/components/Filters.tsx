import { useState } from "react"
import Filter from "../components/Filter"

export default function Filters() {

    const [openSelectId, setOpenSelectId] = useState<number | null>(null)

    function handleSetOpenSelectId(id: number | null) {
        openSelectId == id ? setOpenSelectId(null) : setOpenSelectId(id)
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
        <section className="filters border-bottom-grey">
            { filtersList.map((filter, index) => 
                <Filter key={index} id={index} name={filter.defaultOption} options={filter.options} openSelectId={openSelectId} handleSetOpenSelectId={handleSetOpenSelectId} />
            )}
        </section>
    )
}