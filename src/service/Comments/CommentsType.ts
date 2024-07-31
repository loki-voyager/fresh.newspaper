type CommentsType = {
  id: number;
  news_id: number;
  mention: string | null;
  username: string;
  body: string;
  generation: string;
  likes: number;
  dislikes: number;
};

type GetCommentsProps = {
  id?: number | null;
  username?: string | null;
  page?: number | null;
  limit?: number | null;
  search?: string | null;
};

type GetCommentsResProps = {
  comment: CommentsType[];
  count: number;
  pages: number;
  status?:number;
};

type RatedCommentsProps = {
  username: string;
  page?: number;
  limit?: number;
  search?: string;
};

export type {
  CommentsType,
  GetCommentsProps,
  GetCommentsResProps,
  RatedCommentsProps,
};
