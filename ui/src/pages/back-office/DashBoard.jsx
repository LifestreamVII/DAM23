import ProjectCard, { NewProjectCard } from "../../components/back-office/ProjectCard"
import {ProjectsList} from "./Projects"

export default function DashBoard() {
    return (
        <div className="dashboard">
            <h3 className="dashboard__title">Projets</h3>
            <ProjectsList />
            <h3 className="dashboard__title">Médias</h3>
        </div>
    )
}