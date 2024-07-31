type GradesProps = {
    dislikes: number;
    likes: number;
};

type GetGradesProps = {
    id:number;
};

const GetGrades = async ({ id }: GetGradesProps) => {
    const res = await fetch(`http://localhost:3000/api/GradesGet`, {
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

    const  { likes, dislikes } = (await res.json());

    return { likes, dislikes };
};

export {GetGrades}

export type { GetGradesProps,GradesProps };