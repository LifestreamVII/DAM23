export default async function useGetJWT(username, pwd) {

    const url = 'http://37.187.124.78:90/api/login'
    const payload = {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        }),
        body: {
            mail: username,
            password: pwd
        }
    }

    const message = await fetch(url, payload)
    .then((response) => {
        if (response.ok)
            // return response.json()
            return {
                token: `${response.jwt}`,
                message: `${response.message}`
            }
        console.log(response);
        throw new Error()
    })
    .catch((error) => {
        return { message: 'Une erreur est survenue, réessayez plus tard' }
    })

    return await message
}
