type CreateCommentsProps = {
    news_id: number,
    username: string,
    data: string,
    mention?: string
}
const CreateComments = async (
    {news_id,username,data,mention}:CreateCommentsProps
) => {
    const res = await fetch(`http://localhost:3000/api/CommentsPost`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ news_id, mention, username, data }),
    });

    if (!res.ok) {
        if (res.status === 500) {
            throw new Error(
                `${await res.json().then((r_error) => {
                    return r_error.error;
                })}`
            );
        } else {
            throw new Error(`Failed to comment: ${await res.text()}`);
        }
    }
    return res;
};

export {CreateComments}