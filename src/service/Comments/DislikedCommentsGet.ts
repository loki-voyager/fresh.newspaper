import moment from "moment";
import { GetCommentsResProps, RatedCommentsProps } from "./CommentsType";

const DislikedCommentsGet = async ({
  username,
  page,
  limit,
  search,
}: RatedCommentsProps) => {
  const res = await fetch(`http://localhost:3000/api/DislikedCommentsGet`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      page,
      limit,
      search,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to get disliked comments. Error code: ${res.status}, Message: ${res.statusText}`
    );
  }

  const { comment, count, pages }: GetCommentsResProps = await res.json();

  if (count == 0) {
    return {
      comment: [],
      count: 0,
      pages: 0,
      status: 500,
    } as GetCommentsResProps;
  }

  comment.forEach((item: { generation: any }) => {
    item.generation = moment(item.generation).format("DD-MM-YYYY HH:mm:ss");
  });

  return { comment, count, pages } as GetCommentsResProps;
};

export { DislikedCommentsGet };
