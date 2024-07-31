const NewsLike = async ({ news_id, username }:{news_id:number, username:string}) => {
    const res = await fetch(`http://localhost:3000/api/NewsLike`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            news_id,
            username,
        }),
    });

    if (!res.ok) {
        if (res.status === 500) {
            return false;
        } else {
            throw new Error(`Failed to like news: ${res.status}`);
        }
    }

    return await res.json();
};

export {NewsLike}