const DeleteComments = async({id}:{id:number})=>{
    const res = await fetch(`http://localhost:3000/api/CommentsDelete`, {
        cache: "no-cache",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
    });

    if (!res.ok) {
        console.log(res);
        if (res.status === 500) {
            throw new Error(
                `${await res.json().then((r_error) => {
                    return r_error.error;
                })}`
            );
        } else {
            throw new Error(
                `Error during delete news request. Error code: ${res.status}`
            );
        }
    }
    const {deleted} = await res.json()
    return deleted;
}

export {DeleteComments}