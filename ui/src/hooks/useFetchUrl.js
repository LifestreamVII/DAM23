export default async function useFetchUrl(url, method, headers, body, success, error) {

    const successMessage = success || 'Requête effectuée avec succès'
    const errorMessage = error || 'Une erreur est survenue, réessayez plus tard'

    const payload = {
        method: method,
        headers: new Headers(headers),
        body: new URLSearchParams(body)
    }

    const response = await fetch(url, payload)
    .then((response) => {
        if (response.ok)
            return {
                message: successMessage,
                data: response.json()
            }
        throw new Error()
    })
    .catch((error) => {
        return { 
            message: errorMessage,
            data: error
        }
    })

    return await response
}