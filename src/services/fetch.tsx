export const get = async (path:string) => {
    console.log(path)
    let res = await fetch(path);
    return await res.json();
}

// export const post = (path, body) => fetch(path, {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers : {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     credentials: "include"
// }).then(res => res.text()).then(res => res);

// export const drop = path => fetch(path, { method: 'DELETE' }).then(res => res.text()).then(data => data);
