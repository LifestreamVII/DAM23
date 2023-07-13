export const useCreateUser = async (pwd, mail) => {
    const data = await fetch(`http://localhost:90/signup`, {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        }),
        body: new URLSearchParams({
            mail: mail,
            password: pwd,
        })
    });

    const json = await data.json();
    return json;
}