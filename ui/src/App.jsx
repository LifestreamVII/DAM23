import Router from "./components/Router"
import UserProvider from './contexts/UserContext';

export default function App() {
    return (
        <UserProvider>
            <Router />
        </UserProvider>
    )
}