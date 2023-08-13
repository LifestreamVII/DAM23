import { useParams, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Input from "../../components/Input"
import {TaskCard} from "../../components/back-office/ItemCard"
import PopUp from "../../components/back-office/PopUp"
import useFetchUrl from "../../hooks/useFetchUrl"
import Projects from "./Projects"
import { useContext } from "react"
import { messageBoxContext } from "../../contexts/MessageBoxContext"
import { GetStepsNavigation } from "../../components/back-office/Process"

export default function Tasks({children}) {
    return (
        <div className="tasks">
            <h1 className="back-office__title"><span>Tâches</span></h1>
            <TasksList />
            {children}
        </div>
    )
}

export function TasksList() {
    
    return (
        <section className="back-office__container">
            <TaskCard id="1" description="Ajout des sous-titre anglais de la masterclasse" user="user@mail.com" date="12/10/2023" status="en attente" />
            <TaskCard id="2" description="Sed finibus nisl vel lorem eleifend, nec convallis ipsum aliquet." user="user@mail.com" date="04/05/2023" status="en attente" />
            <TaskCard id="2" description="Sed finibus nisl vel lorem eleifend, nec convallis ipsum aliquet." user="user@mail.com" date="04/05/2023" status="en attente" />
            <TaskCard id="2" description="Sed finibus nisl vel lorem eleifend, nec convallis ipsum aliquet." user="user@mail.com" date="04/05/2023" status="en attente" />
        </section>
    )
}

export function Task() {

    const { id } = useParams()

    return (
        <Tasks>
            <PopUp>
                <div className="pop-up__element">
                    <p className="pop-up__subtitle">en attente</p>
                    <Link to="/admin/projects/1/programmation" className="pop-up__title">Nom du projet</Link>
                    <p className="pop-up__text">username - Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi laudantium, fuga tenetur explicabo aliquid voluptatibus amet neque veritatis minima at velit repudiandae sunt voluptates beatae! Laboriosam est illo eveniet tenetur.</p>
                    <a className="pop-up__file pop-up__text" href="file" download><strong>DOWNLOAD</strong> - [File name]</a>
                </div>
            </PopUp>
        </Tasks>
    )
}

export function NewTask() {

    const [description, setDescription] = useState('')
    const [file, setFile] = useState('')
    const [message, setMessage] = useContext(messageBoxContext)

    const fetchUrl = useFetchUrl()
    const navigate = useNavigate()
    const { id } = useParams()
    const { current, next } = GetStepsNavigation()

    function createTask(e) {
        e.preventDefault()
        // fetchUrl(
        //     'http://localhost:3000/tasks/new',
        //     'POST',
        //     {
        //         'Content-type': 'application/x-www-form-urlencoded'
        //     },
        //     {
        //         file: file,
        //         description: description,
        //         projectId: id,
        //         step: step
        //     }
        // ).then(response => {
        //     setMessage(response.message)
        // })
        setMessage('La tâche a bien été créée')
        navigate(`/admin/projects/${id}/${next}`)
    }

    return (
        <Projects>
            <PopUp>
                <div className="pop-up__element">
                    <p className="pop-up__subtitle">{current}</p>
                    <h2 className="pop-up__title">Masterclasse de Karine</h2>
                    <form action="" className="pop-up__form" onSubmit={createTask}>
                        <Input type="textarea" setValue={setDescription} value={description}>
                            Description
                        </Input>
                        <Input type="file" setValue={setFile} value={file}>
                            File
                        </Input>
                        <button className="btn btn--primary" type="submit">Envoyer la notification</button>
                    </form>
                </div>
            </PopUp>
        </Projects>
    )
}
