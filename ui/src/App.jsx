import Router from "./components/Router"
import UserProvider from './contexts/UserContext';
import MessageBoxProvider from "./contexts/MessageBoxContext";

export default function App() {
    
    return (
        <UserProvider>
            <MessageBoxProvider>
                <Router />
            </MessageBoxProvider>
        </UserProvider>
    )
}