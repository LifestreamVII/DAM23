import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Browse from '../pages/Browse';
import NavBar from './NavBar';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Course from '../pages/Course';

import SideMenu from './back-office/SideMenu';
import DashBoard from '../pages/back-office/DashBoard';
import Projects, {Project, NewProject} from '../pages/back-office/Projects';
import Tasks, {Task, NewTask} from '../pages/back-office/Tasks';
import Medias, { Media } from '../pages/back-office/Medias';

export default function Router() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/browse" element={<DefaultContainer><Browse /></DefaultContainer>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/course/:id" element={<DefaultContainer><Course /></DefaultContainer>} />
                <Route path="/admin/projects" element={<BackOfficeContainer><Projects /></BackOfficeContainer>} />
                <Route path="/admin/projects/:id/:step" element={<BackOfficeContainer><Project /></BackOfficeContainer>} />
                <Route path="/admin/projects/:id/:step/task" element={<BackOfficeContainer><NewTask /></BackOfficeContainer>} />
                <Route path="/admin/projects/new" element={<BackOfficeContainer><NewProject /></BackOfficeContainer>} />
                <Route path="/admin/tasks" element={<BackOfficeContainer><Tasks /></BackOfficeContainer>} />
                <Route path="/admin/tasks/:id" element={<BackOfficeContainer><Task /></BackOfficeContainer>} />
                <Route path="/admin/medias" element={<BackOfficeContainer><Medias /></BackOfficeContainer>} />
                <Route path="/admin/medias/:id" element={<BackOfficeContainer><Media /></BackOfficeContainer>} />
                <Route path="/admin/" element={<BackOfficeContainer><DashBoard /></BackOfficeContainer>} />
                <Route path="/" element={<DefaultContainer><Home /></DefaultContainer>} />
                <Route path="/" element={<DefaultContainer><Home /></DefaultContainer>} />
                <Route path="*" element={<DefaultContainer><NotFound /></DefaultContainer>} />
            </Routes>
        </BrowserRouter>
    )
}

function DefaultContainer({children}) {

    return (
        <>
            <NavBar />
            {children}
        </>
    )
}

function BackOfficeContainer({children}) {
    return (
        <div className="back-office">
            <SideMenu />
            <section className="back-office__page">
                {children}
            </section>
        </div>
    )
}