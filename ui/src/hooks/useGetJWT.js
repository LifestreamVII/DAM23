export default async function useGetJWT(mail, pwd) {
    const data = await fetch('http://localhost:90/login', {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        }),
        body: new URLSearchParams({
            mail: mail,
            password: pwd
        })
    });

    return await data.json();
}