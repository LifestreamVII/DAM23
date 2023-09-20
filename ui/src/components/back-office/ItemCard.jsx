import { Link, useLocation } from "react-router-dom"
import plus from "../../assets/images/icon-plus-white.svg"

export function ProjectCard({ id, completion, title, description }) {
    
    const truncatedDescription = description.length > 100 ? description.substring(0, 80) + "..." : description
    const from = useLocation().pathname

    return (
        <Link to={`/admin/projects/${id}/programmation`} state={{ from: from }} className="item-card">
            <p className="item-card__subtitle"><span>{completion}</span></p>
            <h3 className="item-card__title">{title}</h3>
            <p className="item-card__text">{truncatedDescription}</p>
        </Link>
    )
}

export function MediaCard({ id, mime, size, name, description }) {

    const from = useLocation().pathname

    return (
        <Link to={`/admin/medias/${id}`} state={{ from: from }} className="item-card">
            <p className="item-card__subtitle"><span>{mime}</span> - {size}</p>
            <p className="item-card__title">{name}</p>
            <h3 className="item-card__text">{description}</h3>
        </Link>
    )
}

export function NewItem({to}) {

    const from = useLocation().pathname

    return (
        <Link to={to}  state={{ from: from }} className="new-item" title="Ajouter un élément">
            <img src={plus} alt="" />
        </Link>
    )
}