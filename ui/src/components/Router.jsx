import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom';
import Home from '../pages/Home';
import Browse from '../pages/Browse';
import Register from '../pages/Register';
import NavBar from './NavBar';
import Course from '../pages/Course';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/browse" element={<DefaultContainer><Browse /></DefaultContainer>} />
                <Route path="/login" element={<Register type='login' />} />
                <Route path="/signup" element={<Register type='signup' />} />
                <Route path="/cours/:id" element={<DefaultContainer><Course /></DefaultContainer>} />
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