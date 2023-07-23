import plus from "../../assets/images/icon-plus.svg"
import { Link, useLocation } from "react-router-dom"
import Process from "./Process"

export default function Project() {
    return (
        <div className="project">
            <p className="project__completion">en cours</p>
            <h2 className="project__title">Masterclasse de Miriam Fried</h2>
            <Process />
        </div>
    )
}

export function ProjectCard({ title, description, completion, id }) {

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