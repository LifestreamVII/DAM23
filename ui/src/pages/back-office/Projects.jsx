import Project, {ProjectCard} from "../../components/back-office/Project"
import PopUp from "../../components/back-office/PopUp";
import { useParams } from 'react-router-dom';

export default function Projects() {

    const { id } = useParams()

    return (
        <div className="projects">
            <h1><span>Projets</span></h1>
            <section className="back-office__container">
                <ProjectCard id="1" title="Masterclasse de Miriam Fried" completion="en cours" description="Cras ornare consequat mattis. Aenean rhoncus enim ultrices, pulvinar lectus eleifend, ultricies felis." />
                <ProjectCard id="2" title="Concerto No. 5 in A Major" completion="terminé" description="Sed finibus nisl vel lorem eleifend, nec convallis ipsum aliquet. Praesent vitae est nunc. Donec sed luctus dui." />
                <ProjectCard id="3" title="Cours de violon" completion="terminé" description="Nulla bibendum mollis lectus. Quisque lobortis id augue a eleifend. Duis dapibus luctus gravida." />
                <ProjectCard id="4" title="Masterclasse de flûte" completion="en cours" description="Proin at commodo eros. Etiam in condimentum massa." />
            </section>
            { id ? <PopUp><Project /></PopUp> : null }
        </div>
    )
}