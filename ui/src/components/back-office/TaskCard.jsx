import { useState, useContext } from 'react'
import edit from '../../assets/images/icon-edit.svg'
import check from '../../assets/images/icon-check.svg'
import back from '../../assets/images/icon-back.svg'
import { messageBoxContext } from '../../contexts/MessageBoxContext'
import { useMutation } from 'react-query'
import useFetchUrl from '../../hooks/useFetchUrl'
import Badge from '../Badge'

export default function TaskCard({ id, status, date, title, description, user }) {

    const [editable, setEditable] = useState(false)

    return (
        <div className="item-card item-card--editable" onClick={() => setEditable(true)}>
            <p className="item-card__subtitle"><span>{status}</span> - {date}</p>
            <p className="item-card__title">{title}</p>
            <p className="item-card__text">{description}</p>
            <Badge role={user.role}>{user.username}</Badge>
            <TaskCardEditor id={id} editable={editable} setEditable={setEditable} />
        </div>
    )
}

function TaskCardEditor({id, editable, setEditable}) {
    
    const [message, setMessage] = useContext(messageBoxContext)
    const fetchUrl = useFetchUrl()

    function handleClick(e) {
        e.stopPropagation()
        setEditable(false)
    }

    const acceptTask = useMutation(payload => {
        return fetchUrl(
            `http://localhost:90/task/${id}/edit`,
            'POST',
            {
                'Content-type': 'application/json'
            },
            payload
        )
    })

    return (
        <div className="item-card__overlay">
            { editable 
                ?
                    <div className='item-card__icons'>
                        <img title="Accepter la tâche" src={check} alt="" onClick={() => acceptTask.mutate({ status: 'accepted'})} />
                        <img title="Retour" src={back} alt="" onClick={handleClick} />
                    </div>
                :
                    <img className="item-card__edit" src={edit} alt="" />
            }
        </div>
    )
}