import {
	BrowserRouter,
	Switch,
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
            <Switch>
                <Route path="/browse">
                    <DefaultContainer>
                        <Browse />
                    </DefaultContainer>
                </Route>
                <Route path="/login"><Register type={'login'} /></Route>
                <Route path="/signup"><Register type={'signup'} /></Route>
                <Route path="/cours/:id">
                    <DefaultContainer>
                        <Course />
                    </DefaultContainer>
                </Route>
                <Route path="/">
                    <DefaultContainer>
                        <Home />
                    </DefaultContainer>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

function DefaultContainer({children} : { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}