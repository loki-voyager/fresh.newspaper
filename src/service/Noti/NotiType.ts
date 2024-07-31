type NotiType = {
    id: number;
    body: string;
    mention: string | null;
    com_body: string | null;
    news_id: number;
    generation: string;
    username: string;
    is_read: boolean;
}
type GetNotiProps = {
    username: string;
    limit?: number;
    page?: number;
    search?: string;
};
type GetNotiRes = {
    noti: NotiType[];
    count: number;
    pages: number;
    status?:number;
};

export type {GetNotiProps,GetNotiRes,NotiType}