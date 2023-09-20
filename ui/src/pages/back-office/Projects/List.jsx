import {ProjectCard, NewItem} from "../../../components/back-office/ItemCard"
import { useContext } from "react";
import useFetchUrl from "../../../hooks/useFetchUrl";
import { useQuery } from 'react-query'
import Loader from "../../../components/Loader";
import { messageBoxContext } from "../../../contexts/MessageBoxContext";

export default function ProjectsList() {

    const [message, setMessage] = useContext(messageBoxContext)
    const fetchUrl = useFetchUrl()

    function getAllProjects() {
        return fetchUrl(
            'http://localhost:90/projects',
            'GET',
            {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        ).then(response => {
            if (response.projects)
                return response.projects
        })
    }

    const { isLoading, isError, data, error } = useQuery('projects', getAllProjects)

    if (isLoading) return <Loader />
    
    if (isError) {
        setMessage(error.message)
        return
    }
            
    return (
        <section className="back-office__container">
            <NewItem page="projects" text="Nouveau projet" />
            {data.map((project, index) => {
                return <ProjectCard key={index} id={project.id} title={project.title} completion={project.completion} description={project.description} />
            })}
        </section>
    )
}