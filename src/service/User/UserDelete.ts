const UserDelete = async ({ username }: {username:string}) => {
    const res = await fetch(`http://localhost:3000/api/UserAuth`, {
        cache: "no-cache",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
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

export {UserDelete}