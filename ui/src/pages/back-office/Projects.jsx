import ProjectCard from "../../components/back-office/ProjectCard"
import Process from "../../components/back-office/Process";
import PopUp from "../../components/back-office/PopUp";
import { useParams } from 'react-router-dom';

export default function Projects({children}) {

    return (
        <div className="projects">
            <h1><span>Projets</span></h1>
            <section className="back-office__container">
                <ProjectCard id="1" title="Masterclasse de Miriam Fried" completion="en cours" description="Cras ornare consequat mattis. Aenean rhoncus enim ultrices, pulvinar lectus eleifend, ultricies felis." />
                <ProjectCard id="2" title="Concerto No. 5 in A Major" completion="terminé" description="Sed finibus nisl vel lorem eleifend, nec convallis ipsum aliquet. Praesent vitae est nunc. Donec sed luctus dui." />
                <ProjectCard id="3" title="Cours de violon" completion="terminé" description="Nulla bibendum mollis lectus. Quisque lobortis id augue a eleifend. Duis dapibus luctus gravida." />
                <ProjectCard id="4" title="Masterclasse de flûte" completion="en cours" description="Proin at commodo eros. Etiam in condimentum massa." />
            </section>
            {children}
        </div>
    )
}

export function Project() {

    const { id } = useParams()

    return (
        <Projects>
            <PopUp>
                <div className="project">
                    <p className="project__completion">en cours</p>
                    <h2 className="project__title">Masterclasse de Miriam Fried</h2>
                    <Process />
                </div>
            </PopUp>
        </Projects>
    )
}

export function NewProject() {

    return (
        <Projects>
            <PopUp>
                <div className="project">
                    <h2 className="project__title">Nouveau projet</h2>
                    <form action="" className="project__form">
                    </form>
                </div>
            </PopUp>
        </Projects>
    )
}