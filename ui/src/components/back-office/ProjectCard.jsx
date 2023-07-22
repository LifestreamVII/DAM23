import plus from "../../assets/images/icon-plus.svg"
import { Link, useLocation } from "react-router-dom"

export default function ProjectCard({ title, description, completion, id }) {

    const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description
    const { pathname } = useLocation()

    return (
        <Link to={`/admin/projects/${id}`} state={{ from: pathname }} className="project-card">
            <span className="project-card__completion">{completion}</span>
            <h3 className="project-card__title">{title}</h3>
            <p className="project-card__description">{truncatedDescription}</p>
        </Link>
    )
}

export function ProjectCardButton() {
    return (
        <button className="project-card project-card--btn">
            <img className="project-card__plus" src={plus} alt="" />
            <h3 className="project-card__title">Nouveau projet</h3>
        </button> 
    )
} 