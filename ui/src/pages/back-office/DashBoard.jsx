import {ProjectsList} from "./Projects"
import { TasksList } from "./Tasks"
import { MediasList } from "./Medias"
import { Link } from "react-router-dom"

export default function DashBoard() {
    return (
        <div className="dashboard">
            <Link to="/admin/projects" className="back-office__subtitle">
                Projets
            </Link>
            <ProjectsList />
            <section className="back-office__columns">
                <div className="back-office__column">
                    <Link to="/admin/tasks" className="back-office__subtitle">
                        Tâches
                    </Link>
                    <TasksList />
                </div>
                <div className="back-office__column">
                    <Link to="/admin/medias" className="back-office__subtitle">
                        Médias
                    </Link>
                    <MediasList />
                </div>
            </section>
            <Link to="/admin/projects" className="back-office__subtitle">
                Projets
            </Link>
            <ProjectsList />
        </div>
    )
}