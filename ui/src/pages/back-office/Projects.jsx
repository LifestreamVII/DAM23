import {ProjectCard, NewItemCard} from "../../components/back-office/ItemCard"
import Process, {GetStepsNavigation} from "../../components/back-office/Process";
import PopUp from "../../components/back-office/PopUp";
import Input from "../../components/Input";
import { useParams, Link } from 'react-router-dom';
import { useState, useContext } from "react";
import useFetchUrl from "../../hooks/useFetchUrl";
import { useQuery, useMutation } from 'react-query'
import Loader from "../../components/Loader";
import { messageBoxContext } from "../../contexts/MessageBoxContext";

export default function Projects({children}) {

    return (
        <div className="projects">
            <h1 className="back-office__title"><span>Projets</span></h1>
            <ProjectsList />
            {children}
        </div>
    )
}

export function ProjectsList() {

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
            <NewItemCard page="projects" text="Nouveau projet" />
            {data.map((project, index) => {
                return <ProjectCard key={index} id={project.id} title={project.title} completion={project.completion} description={project.description} />
            })}
        </section>
    )
}

export function Project() {

    const { id } = useParams()

    const [message, setMessage] = useContext(messageBoxContext)
    const {previous, next, isFirst, isLast, current } = GetStepsNavigation()

    const fetchUrl = useFetchUrl()

    function getProjectById() {
        return fetchUrl(
            'http://localhost:90/project',
            'POST',
            {
                'Content-type': 'application/json'
            },
            {
                id: id
            }
        ).then(response => {
            if(response.project)
                return response.project
        })
    }

    const { isLoading, isError, data, error } = useQuery('project', getProjectById)

    if (isLoading) return <Loader />
    
    if (isError) {
        setMessage(error.message)
        return
    }

    return (
        <Projects>
            <PopUp>
                <div className="pop-up__element">
                    <p className="pop-up__subtitle">{data.completion}</p>
                    <h2 className="pop-up__title">{data.title}</h2>
                    <p className="pop-up__text">{data.description}</p>
                    <Process />
                    <a className="pop-up__file pop-up__text" href="file" download><strong>DOWNLOAD</strong> - [File name]</a>
                </div>
                <div className="pop-up__buttons">
                    <Link to={`/admin/projects/${id}/${previous}`} className={`btn btn--secondary ${isFirst ? 'btn--disabled' : "" }`}>Précedent</Link>
                    <Link to={`/admin/projects/${id}/${current}/task`} state={{ from: "/admin/projects/" }} className={`btn btn--full ${isLast ? 'btn--disabled' : "" }`}>Ajouter un fichier</Link>
                </div>
            </PopUp>
        </Projects>
    )
}

export function NewProject() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useContext(messageBoxContext)

    const fetchUrl = useFetchUrl()

    const mutation = useMutation(payload => {
        return fetchUrl(
            'http://localhost:90/project/new',
            'POST',
            {
                'Content-type': 'application/json'
            },
            payload
        )
    })

    if (mutation.isError) {
        setMessage(mutation.error.message)
    }

    if (mutation.isSuccess) {
        setMessage('Le projet a bien été créé')
    }

    return (
        <Projects>
            <PopUp>
                {mutation.isLoading ? <Loader /> : null}
                 
                <div className="pop-up__element">
                    <h2 className="pop-up__title">Nouveau projet</h2>
                    <form action="" className="pop-up__form" onSubmit={(e) => { e.preventDefault(); mutation.mutate({ title: title, description: description }) }}>
                        <Input type="text" setValue={setTitle} value={title}>
                            Titre
                        </Input>
                        <Input type="textarea" setValue={setDescription} value={description}>
                            Description
                        </Input>
                        <button className="btn btn--primary" type="submit">Créer le projet</button>
                    </form>
                </div>
            </PopUp>
        </Projects>
    )
}