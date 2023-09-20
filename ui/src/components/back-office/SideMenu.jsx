import logo from '../../assets/images/logo-white.svg'
import home from '../../assets/images/icon-home.svg'
import project from '../../assets/images/icon-project.svg'
import media from '../../assets/images/icon-media.svg'

export default function SideMenu() {
    return (
        <aside className="side-menu">
            <img className="side-menu__logo" src={logo} alt="" />
            <nav>
                <a href="/admin" className="side-menu__link">
                    <img src={home} alt="" />
                    <span>Accueil</span>
                </a>
                <a href="/admin/projects" className="side-menu__link">
                    <img src={project} alt="" />
                    <span>Projets</span>
                </a>
                <a href="/admin/medias" className="side-menu__link">
                    <img src={media} alt="" />
                    <span>Médias</span>
                </a>
            </nav>
        </aside>
    )
}