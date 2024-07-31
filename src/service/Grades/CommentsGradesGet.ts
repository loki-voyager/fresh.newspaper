import {GetGradesProps} from "@/service/Grades/GradesGet";

type ComGradesProps = {
    likes: number;
    dislikes: number;
};

type ComGradesListProps = {
    username: string;
    page?: number;
    limit?: number;
    search?: string;
};

const GetComGrades = async ({id}: GetGradesProps) => {
    const res = await fetch(`http://localhost:3000/api/CommentsGradesGet`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
    });

    if (!res.ok) {
        if (res.status === 500) {
            // return false;
            return {likes: 0, dislikes: 0};
        } else {
            throw new Error(
                `Failed to get comment: ${await res.json().then((r_error) => {
                    return r_error.error;
                })}`
            );
        }
    }

    const {likes, dislikes} = await res.json();

    return {likes, dislikes};
};

export {GetComGrades}

export type {ComGradesProps, ComGradesListProps};