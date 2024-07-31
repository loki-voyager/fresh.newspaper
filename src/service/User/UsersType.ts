type UserType = {
    id: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    likes: number[];
    dislikes: number[];
    com_likes: number[];
    com_dislikes: number[];
    role: string;
    image_data?: string[];
}

type GetUserProps = {
    page?: number | null;
    limit?: number | null;
    search?: string | null;
    username?: string | null;
};

type GetUserResProps = {
    users: UserType[];
    count: number;
    pages: number;
    status?: number;
};


export type {UserType,GetUserProps,GetUserResProps}