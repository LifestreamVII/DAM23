import { messageBoxContext } from '../contexts/MessageBoxContext'
import { useContext } from 'react'

export default function useFetchUrl() {

    const [message, setMessage] = useContext(messageBoxContext)

    return async function (url, method, headers, body) {

        const get = method === 'GET'

        const payload = {
            method: method,
            headers: new Headers(headers),
            body: body ? JSON.stringify(body) : undefined
        }

        const response = await fetch(url, payload)
        const data = await response.json()
        if (response.ok) {
            if (!get) setMessage(data.message) 
            return data
        }
        setMessage(data.message)

    }
}