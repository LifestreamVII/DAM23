import ProjectsList from "./Projects/List"
import TasksList from "./Tasks/List"
import { MediasList } from "./Medias"
import { Link } from "react-router-dom"

export default function DashBoard() {
    return (
        <div className="dashboard">
            <Link to="/admin/projects" className="back-office__subtitle">
                Projets
            </Link>
            <ProjectsList />
            <Link to="/admin/medias" className="back-office__subtitle">
                Médias
            </Link>
            <MediasList />
        </div>
    )
}