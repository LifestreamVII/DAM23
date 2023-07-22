import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom';
import Home from '../pages/Home';
import Browse from '../pages/Browse';
import NavBar from './NavBar';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Course from '../pages/Course';

import SideMenu from './back-office/SideMenu';
import DashBoard from '../pages/back-office/DashBoard';
import Projects from '../pages/back-office/Projects';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/browse" element={<DefaultContainer><Browse /></DefaultContainer>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cours/:id" element={<DefaultContainer><Course /></DefaultContainer>} />
                <Route path="/admin/projects" element={<BackOfficeContainer><Projects /></BackOfficeContainer>} />
                <Route path="/admin/projects/:id" element={<BackOfficeContainer><Projects /></BackOfficeContainer>} />
                <Route path="/admin/" element={<BackOfficeContainer><DashBoard /></BackOfficeContainer>} />
                <Route path="/" element={<DefaultContainer><Home /></DefaultContainer>} />
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