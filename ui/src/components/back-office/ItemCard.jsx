import { Link } from "react-router-dom"
import plus from "../../assets/images/icon-plus.svg"

export function ProjectCard({ id, completion, title, description }) {
    
    const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description

    return (
        <Link to={`/admin/projects/${id}/programmation`} state={{ from: `/admin/projects` }} className="item-card">
            <p className="item-card__subtitle"><span>{completion}</span></p>
            <h3 className="item-card__title">{title}</h3>
            <p className="item-card__text">{truncatedDescription}</p>
        </Link>
    )
}

export function TaskCard({ id, status, date, description, user }) {
        
        return (
            <Link to={`/admin/tasks/${id}`} state={{ from: `/admin/tasks` }} className="item-card">
                <p className="item-card__subtitle"><span>{status}</span> - {date}</p>
                <p className="item-card__text item-card__text--strong">{user}</p>
                <p className="item-card__text">{description}</p>
            </Link>
        )
}

export function MediaCard({ id, mime, size, name, description }) {

    return (
        <Link to={`/admin/medias/${id}`} state={{ from: `/admin/medias` }} className="item-card">
            <p className="item-card__subtitle"><span>{mime}</span> - {size}</p>
            <h3 className="item-card__title">{description}</h3>
            <p className="item-card__text">{name}</p>
        </Link>
    )
}

export function NewItemCard({ page, text }) {

    return (
        <Link to={`/admin/${page}/new`} state={{ from: `/admin/${page}` }}  className="item-card item-card--new">
            <img className="item-card__plus" src={plus} alt="" />
            <h3 className="item-card__title">{text}</h3>
        </Link>
    )
}