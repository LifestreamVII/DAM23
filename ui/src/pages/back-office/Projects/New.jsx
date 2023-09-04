import PopUp from "../../../components/back-office/PopUp";
import Input from "../../../components/Input";
import { useState, useContext } from "react";
import useFetchUrl from "../../../hooks/useFetchUrl";
import { useMutation, useQuery } from 'react-query'
import Loader from "../../../components/Loader";
import { messageBoxContext } from "../../../contexts/MessageBoxContext";
import Projects from "./Page";

export default function NewProject() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [usersId, setUsersId] = useState([])
    const [message, setMessage] = useContext(messageBoxContext)

    const fetchUrl = useFetchUrl()

    function handleSetUsersId(user) {
        if (usersId.includes(user)) {
            setUsersId(usersId.filter(u => u !== user))
            return
        }
        setUsersId([...usersId, user])
    }
    
    function createProject(e) {
        e.preventDefault()
        mutation.mutate({ title: title, description: description, usersId: usersId })
    }

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
    
    function getAllUsers() {
        return fetchUrl(
            'http://localhost:90/users',
            'GET',
            {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        ).then(response => {
            if (response.users) {
                return response.users.reduce((acc, user) => {
                    acc.push({ value: user.id, text: user.mail + ' - ' + user.username })
                    return acc
                }
                , [])
            }
        })
    }

    const { isLoading, isError, data, error } = useQuery('users', getAllUsers)

    if (isError) {
        setMessage(error.message)
    }

    if (mutation.isError) {
        setMessage(mutation.error.message)
    }
    
    return (
        <Projects>
            <PopUp>
                {mutation.isLoading || isLoading ? <Loader /> : null}
                 
                <div className="pop-up__element">
                    <h3 className="pop-up__subtitle">Nouveau projet</h3>
                    <form action="" className="pop-up__form" onSubmit={createProject}>
                        <Input type="text" setValue={setTitle} value={title}>
                            Titre
                        </Input>
                        <Input type="textarea" setValue={setDescription} value={description}>
                            Description
                        </Input>
                        <Input type="select" setValue={handleSetUsersId} value={usersId} options={data} multiple>
                            Contributeurs
                        </Input>
                        <button className="btn btn--primary" type="submit">Créer le projet</button>
                    </form>
                </div>
            </PopUp>
        </Projects>
    )
}