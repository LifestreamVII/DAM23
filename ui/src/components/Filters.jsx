import { useState } from "react"
import Filter from "./Filter"

export default function Filters() {

    const [openSelectId, setOpenSelectId] = useState(null)

    function handleSetOpenSelectId(id) {
        openSelectId === id ? setOpenSelectId(null) : setOpenSelectId(id)
    }

    const [tagsSelected, setTagsSelected] = useState({})

    const filtersList = [
        {
            name: "instrument",
            tags: ["violon", "piano", "guitare", "flûte"],
        },
        {
            name: "compositeur",
            tags: ["Mozart", "Chopin", "Beethoven", "Bach"],
        }
    ]

    function handleSetTagsSelected(name, tag) {
        if (!tagsSelected[name]) {
            setTagsSelected({...tagsSelected, [name]: [tag]})
            console.log(tagsSelected)
            return
        }
        if (tagsSelected[name].includes(tag)) {
            const newTags = tagsSelected[name].filter((item) => item !== tag)
            console.log(newTags)
            setTagsSelected({...tagsSelected, [name]: newTags})
            console.log(tagsSelected)
            return
        }
        setTagsSelected({...tagsSelected, [name]: [...tagsSelected[name], tag]})
        console.log(tagsSelected)
    }

    return (
        <section className="filters border-bottom--space">
            { filtersList.map((filter, index) => 
                <Filter key={index}  id={index} name={filter.name} tags={filter.tags} openSelectId={openSelectId} handleSetOpenSelectId={handleSetOpenSelectId} tagsSelected={tagsSelected} handleSetTagsSelected={handleSetTagsSelected} />
            )}
        </section>
    )
}