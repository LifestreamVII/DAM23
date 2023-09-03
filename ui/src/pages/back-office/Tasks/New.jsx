import { useState, useContext, useEffect } from 'react'
import { messageBoxContext } from '../../../contexts/MessageBoxContext'
import useFetchUrl from '../../../hooks/useFetchUrl'
import PopUp from '../../../components/back-office/PopUp'
import Input from '../../../components/Input'
import Tasks from './Page'
import { useQuery, useMutation } from 'react-query'
import Loader from '../../../components/Loader'

export default function NewTask() {

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [projectId, setProjectId] = useState(0)
	const [taskReceiverId, setTaskReceiverId] = useState(false)
	const [projectsOptions, setProjectsOptions] = useState([])
	const [usersOptions, setUsersOptions] = useState([])	
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
			if (response.projects) {
				console.log(response.projects)
				return response.projects
			}
		})
	}

	function createTask(e) {
        e.preventDefault()
        mutation.mutate({ title: title, description: description, projectId: projectId, taskReceiverId: taskReceiverId })
    }

    const mutation = useMutation(payload => {
        return fetchUrl(
            'http://localhost:90/task/new',
            'POST',
            {
                'Content-type': 'application/json'
            },
            payload
        )
    })

	const {data, isLoading, isError, error} = useQuery('projects', getAllProjects)
	
	useEffect(() => {
		setProjectsOptions(data?.map(project => {
			return {value: project.id, text: project.title}
		}))
		setUsersOptions(data?.find(project => project.id === projectId)?.users.map(user => {
			return {value: user.id, text: user.mail}
		}))
		console.log(projectsOptions)
		console.log(usersOptions)
	}, [data, projectId])

	if (isLoading) return <Loader />
	
	if (isError) {
		setMessage(error.message)
		return
	}

	return (
		<Tasks>
			<PopUp>
				<div className="pop-up__element">
					<h3 className="pop-up__subtitle">Nouvelle tâche</h3>
					<form action="" className="pop-up__form" onSubmit={createTask}>
						<Input type="select" value={projectId} setValue={setProjectId} options={projectsOptions}>
							Projet
						</Input>
						<Input type="text" setValue={setTitle} value={title}>
							Titre
						</Input>
						<Input type="textarea" setValue={setDescription} value={description}>
							Description
						</Input>
						<Input type="select" value={taskReceiverId} setValue={setTaskReceiverId} options={usersOptions}>
							Affecter à
						</Input>
						<button className="btn btn--primary" type="submit">Créer la tâche</button>
					</form>
				</div>
			</PopUp>
		</Tasks>
	)
}