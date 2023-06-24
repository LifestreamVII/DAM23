import {
	BrowserRouter,
	Switch,
	Route
} from 'react-router-dom';
import Home from '../pages/Home';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/"><Home /></Route>
            </Switch>
        </BrowserRouter>
    )
}