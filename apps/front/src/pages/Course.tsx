import { useParams } from "react-router-dom"

export default function Course() {

    const id = useParams<{id: string}>().id

    return (
        <div>
            <h1>Je suis le cours {id}</h1>
        </div>
    )
}