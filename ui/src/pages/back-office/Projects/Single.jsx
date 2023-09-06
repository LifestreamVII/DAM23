import Process, {GetStepsNavigation} from "../../../components/back-office/Process"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from "react"
import useFetchUrl from "../../../hooks/useFetchUrl"
import { useQuery, useMutation } from 'react-query'
import Loader from "../../../components/Loader"
import { messageBoxContext } from "../../../contexts/MessageBoxContext"
import Badge from "../../../components/Badge"
import { MediaCard, NewItem } from "../../../components/back-office/ItemCard"
import TaskCard from "../../../components/back-office/TaskCard"

export default function Project({children}) {

	const { id } = useParams()

	const [message, setMessage] = useContext(messageBoxContext)
	const {isLast, current} = GetStepsNavigation()
	const [files, setFiles] = useState([])

	const fetchUrl = useFetchUrl()

	function getProjectById() {
		return fetchUrl(
			`http://localhost:90/project/${id}`,
			'GET',
			{
				'Content-type': 'application/json'
			},
		).then(response => {
			if(response.project)
				return response.project
		})
	}

	const { isLoading, isError, data, error } = useQuery(`project-${id}`, getProjectById)

	if (isLoading) return <Loader />
	
	if (isError) {
		setMessage(error.message)
		return
	}

	return (
		<>
			<div className="project">
				<h1 className="back-office__title">{data.title}</h1>
				<p className="project__description">{data.description}</p>
				<p className="back-office__subtitle">contributeurs</p>
				<section className="project__container">
					{data.users.map((user, index) => 
						<Badge key={index}>{user.username}</Badge>
					)}
						<Badge role={'admin'}>user7</Badge>
				</section>
				<p className="back-office__subtitle">médias</p>
				<section className="back-office__container">
					{/* TODO GET PROJECT MEDIAS */}
					<MediaCard mime="png" size="475ko" name="lorem.png" description="Curabitur sit amet accumsan sem" />
					<MediaCard mime="mp4" size="2.3Mo" name="ipsum.mp4" description="Orci varius natoque penatibus et magnis" />
				</section>
				<p className="back-office__subtitle">tâches</p>
				<section className="back-office__container project__tasks">
					<NewItem to={`/admin/projects/${id}/task/new`} />
					{data.tasks.map((task, index) =>
						<TaskCard key={index} id={task.id} status={task.status} date={task.date} title={task.title} description={task.description} user={task.user} />
					)}
				</section>
			</div>
			{children}
		</>
	)
}