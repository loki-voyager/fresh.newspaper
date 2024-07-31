import { GetNewsProps, GetNewsResProps } from "@/service/News/NewsType";
import moment from "moment";

type RatedNewsGetProps = GetNewsProps & {
  username: string;
};

const LikedNewsGet = async ({
  username,
  page,
  limit,
  search,
}: RatedNewsGetProps) => {
  const res = await fetch(`http://localhost:3000/api/LikedNewsGet`, {
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
      `Failed to get liked news. Error code: ${res.status}, Message: ${res.statusText}`
    );
  }

  const { news, count, pages }: GetNewsResProps = await res.json();

  if (count == 0) {
    return { news: [], count: 0, pages: 0, status: 500 } as GetNewsResProps;
  }

  news.forEach((item: { generation: any }) => {
    item.generation = moment(item.generation).format("DD-MM-YYYY HH:mm:ss");
  });

  return { news, count, pages } as GetNewsResProps;
};

export { LikedNewsGet };

export type { RatedNewsGetProps };
