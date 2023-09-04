import { TaskCard, NewItemCard } from "../../../components/back-office/ItemCard"
import { useContext } from "react";
import useFetchUrl from "../../../hooks/useFetchUrl";
import { useQuery } from 'react-query'
import Loader from "../../../components/Loader";
import { messageBoxContext } from "../../../contexts/MessageBoxContext";

export default function TasksList() {

    const [message, setMessage] = useContext(messageBoxContext)
    const fetchUrl = useFetchUrl()

    function getAllTasks() {
        return fetchUrl(
            'http://localhost:90/tasks',
            'GET',
            {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        ).then(response => {
            if (response.tasks)
                return response.tasks
        })
    }

    const { isLoading, isError, data, error } = useQuery('tasks', getAllTasks)

    if (isLoading) return <Loader />
    
    if (isError) {
        setMessage(error.message)
        return
    }
    
    return (
        <section className="back-office__container">
            <NewItemCard page="tasks" text="Nouvelle tâche" />
            {data.map((task, index) => {
                return (
                    <TaskCard
                        key={index}
                        id={task.id}
                        description={task.description}
                        date={task.date}
                        status={task.status}
                        project={task.project}
                    />
                )
            })}
        </section>
    )
}