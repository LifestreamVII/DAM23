import {ProjectCard, ProjectCardButton } from "../../components/back-office/Project"

export default function DashBoard() {
    return (
        <div className="dashboard">
            <h3 className="dashboard__title">Projets</h3>
            <section className="dashboard__projects">
                <ProjectCardButton />
                <ProjectCard title="Masterclasse de Miriam Fried" completion="en cours" description="Cras ornare consequat mattis. Aenean rhoncus enim ultrices, pulvinar lectus eleifend, ultricies felis." />
                <ProjectCard title="Concerto No. 5 in A Major" completion="terminé" description="Sed finibus nisl vel lorem eleifend, nec convallis ipsum aliquet. Praesent vitae est nunc. Donec sed luctus dui." />
                <ProjectCard title="Cours de violon" completion="terminé" description="Nulla bibendum mollis lectus. Quisque lobortis id augue a eleifend. Duis dapibus luctus gravida." />
                <ProjectCard title="Masterclasse de flûte" completion="en cours" description="Proin at commodo eros. Etiam in condimentum massa." />
            </section>
            <h3 className="dashboard__title">Médias</h3>
        </div>
    )
}