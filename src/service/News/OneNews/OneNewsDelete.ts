const DeleteOneNews = async ({ id }: { id: number }) => {
    const res = await fetch(`http://localhost:3000/api/OneNewsDelete`, {
        cache: "no-cache",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
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
    const data = await res.json();
    return data.delete_news;
};

export {DeleteOneNews}