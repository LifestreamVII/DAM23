export default async function useCreateUser(username, mail, password ) {

    const url = 'http://localhost:90/signup'
    const payload = {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        }),
        body: new URLSearchParams({
            username: username,
            mail: mail,
            password: password,
        })
    }

    const message = await fetch(url, payload)
    .then((response) => {
        if (response.ok)
            return { message: 'Utilisateur crée avec succès' }
        throw new Error()
    })
    .catch((error) => {
        return { message: 'Une erreur est survenue, réessayez plus tard' }
    })

    return await message
}