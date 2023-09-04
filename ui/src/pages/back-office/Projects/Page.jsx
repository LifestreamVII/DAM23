import ProjectsList from "./List"

export default function Projects({children}) {

    return (
        <div className="projects">
            <h1 className="back-office__title"><span>Projets</span></h1>
            <ProjectsList />
            {children}
        </div>
    )
}