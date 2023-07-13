export default async function useCreateUser(username, mail, password ) {
    const data = await fetch(`http://localhost:90/signup`, {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        }),
        body: new URLSearchParams({
            username: username,
            mail: mail,
            password: password,
        })
    });

    const json = await data.json();
    return json;
}