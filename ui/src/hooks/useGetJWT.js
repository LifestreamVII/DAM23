export default async function useGetJWT(mail, pwd) {

    const url = 'http://localhost:90/login'
    const payload = {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        }),
        body: new URLSearchParams({
            mail: mail,
            password: pwd
        })
    }

    const message = await fetch(url, payload)
    .then((response) => {
        if (response.ok)
            // return response.json()
            return {
                token: 'token',
                message: 'Bienvenue, username'
            }
        throw new Error()
    })
    .catch((error) => {
        return { message: 'Une erreur est survenue, réessayez plus tard' }
    })

    return await message
}