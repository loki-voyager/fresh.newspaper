const NotiDelete = async ({ id,username }: {id:number,username:string}) => {
    const res = await fetch(`http://localhost:3000/api/NotiDelete`, {
        cache: "no-cache",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id,username }),
    });

    if (!res.ok) {
        if (res.status === 500) {
            return false;
        } else {
            throw new Error(`Failed to delete user. Error code: ${res.status}`);
        }
    }
    return await res.json();
};

export {NotiDelete}