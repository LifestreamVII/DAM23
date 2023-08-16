import Router from "./components/Router"
import UserProvider from './contexts/UserContext';
import MessageBoxProvider from "./contexts/MessageBoxContext";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
  
export default function App() {
    
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    })
    
    return (
        <UserProvider>
            <MessageBoxProvider>
                <QueryClientProvider client={queryClient}>
                    <Router />
                </QueryClientProvider>
            </MessageBoxProvider>
        </UserProvider>
    )
}