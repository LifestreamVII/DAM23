import { useState, useContext, useEffect } from 'react'
import { messageBoxContext } from '../../../contexts/MessageBoxContext'
import useFetchUrl from '../../../hooks/useFetchUrl'
import PopUp from '../../../components/back-office/PopUp'
import Input from '../../../components/Input'
import Project from '../Projects/Single'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import Loader from '../../../components/Loader'
import { useParams } from 'react-router-dom'

export default function NewTask() {

	const { id } = useParams()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [taskReceiverId, setTaskReceiverId] = useState(false)
	const [message, setMessage] = useContext(messageBoxContext)

	const fetchUrl = useFetchUrl()
	const queryClient = useQueryClient()
	
	function createTask() {
		return fetchUrl(
			'http://localhost:90/task/new',
			'POST',
			{
				'Content-type': 'application/json'
			},
			{
				title: title,
				description: description,
				projectId: id,
				taskReceiverId: taskReceiverId
			}
		)
	}

    const mutation = useMutation({
		mutationFn: createTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`project-${id}`] })
		}
	})

	function handleSubmit(e) {
        e.preventDefault()
        mutation.mutate()
    }

	function getProjectUsers() {
		return fetchUrl(
			`http://localhost:90/project/${id}/users`,
			'GET',
			{
				'Content-type': 'application/json'
			},
		).then(response => {
			if(response.users)
				return response.users.reduce((acc, user) => {
					acc.push({ value: user.id, text: user.mail + ' - ' + user.username })
					return acc
				}
				, [])
		})
	}

	const { isLoading, isError, data, error } = useQuery(`project-users-${id}`, getProjectUsers)
	
	if (isLoading) return <Loader />

	if (isError) {
		setMessage(error.message)
		return
	}

	return (
		<Project>
			<PopUp>
		 		<div className="pop-up__element">
				 <h3 className="pop-up__subtitle">Nouvelle tâche</h3>
		 			<form action="" className="pop-up__form" onSubmit={handleSubmit}>
		 				<Input type="text" setValue={setTitle} value={title}>
		 					Titre
		 				</Input>
		 				<Input type="textarea" setValue={setDescription} value={description}>
		 					Description
		 				</Input>
		 				<Input type="select" value={taskReceiverId} setValue={setTaskReceiverId} options={data}>
		 					Affecter à
		 				</Input>
		 				<button className="btn btn--primary" type="submit">Créer la tâche</button>
		 			</form>
				</div>
			</PopUp>
		</Project>
	)
}