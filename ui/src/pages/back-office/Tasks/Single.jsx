import PopUp from "../../../components/back-office/PopUp"
import Tasks from "./Page"
import { useParams } from "react-router-dom"
import { useContext } from "react";
import useFetchUrl from "../../../hooks/useFetchUrl";
import { useQuery } from 'react-query'
import Loader from "../../../components/Loader";
import { messageBoxContext } from "../../../contexts/MessageBoxContext";

export default function Task() {

    const { id } = useParams()

    const [message, setMessage] = useContext(messageBoxContext)
    const fetchUrl = useFetchUrl()

    function getTaskById() {
        return fetchUrl(
            `http://localhost:90/task/${id}`,
            'GET',
            {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        ).then(response => {
            if (response.task)
                console.log(response.task)
                return response.task
        })
    }

    const { isLoading, isError, data, error } = useQuery('task', getTaskById)

    if (isLoading) return <Loader />
    
    if (isError) {
        setMessage(error.message)
        return
    }

    return (
        <Tasks>
            <PopUp>
                <div className="pop-up__element">
                    <h3><span className="pop-up__subtitle">{data.status}</span> - {data.date}</h3>
                    <h2 className="pop-up__title">{data.title} ({data.project})</h2>
                    <p className="pop-up__text">{data.description}</p>
                </div>
            </PopUp>
        </Tasks>
    )
}