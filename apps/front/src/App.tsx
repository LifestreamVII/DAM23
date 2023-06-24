import { useMe } from './hooks/api'
import Router from './components/Router'
import NavBar from './components/NavBar'

function App() {
	const me = useMe()

	return (
		<>
			<NavBar />
			<Router />
		</>
	)
}

export default App;
