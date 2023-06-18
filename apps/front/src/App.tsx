import { useMe } from './hooks/api'
import Router from './components/Router'

function App() {
	const me = useMe()

	return (
		<Router />
	)
}

export default App;
