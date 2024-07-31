import moment from "moment";

const GetOneNews = async ({ id }: { id: number }) => {
    const res = await fetch(`http://localhost:3000/api/OneNewsGet`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
    });

    if (!res.ok) {
        if (res.status === 500) {
            return false;
        } else {
            throw new Error(
                `Failed to get news: ${await res.json().then((r_error) => {
                    return r_error.error;
                })}`
            );
        }
    }

    const data = (await res.json()).news;

    // console.log({data});

    data.generation = moment(data.generation).format("DD-MM-YYYY HH:mm:ss");

    return data;
};

export {GetOneNews}