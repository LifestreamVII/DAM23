import plus from "../../assets/images/icon-plus.svg"

export default function ProjectCard({ title, description, completion }) {

    const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description

    return (
        <div className="project-card">
            <span className="project-card__completion">{completion}</span>
            <h3 className="project-card__title">{title}</h3>
            <p className="project-card__description">{truncatedDescription}</p>
        </div>
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