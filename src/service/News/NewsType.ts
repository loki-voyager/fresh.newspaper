import moment from "moment";

type NewsType = {
    id: number;
    title: string;
    body: string;
    username: string;
    image_data: string[];
    generation: string;
    likes: number;
    dislikes: number;
}

type GetNewsProps = {
    page?: number | null;
    limit?: number | null;
    search?: string | null;
};

type GetNewsResProps = {
    news: NewsType[];
    count: number;
    pages: number;
    status?: number;
};


export type {NewsType,GetNewsProps, GetNewsResProps};
