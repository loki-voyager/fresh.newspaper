const CommentsDislike = async ({ com_id, username }: {com_id:number,username:string}) => {
    const res = await fetch(`http://localhost:3000/api/CommentsDislike`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ com_id, username }),
    });

    if (!res.ok) {
        if (res.status === 500) {
            return false;
        } else {
            throw new Error(`Failed to dislike comment: ${res.status}`);
        }
    }

    return await res.json();
};

export {CommentsDislike}