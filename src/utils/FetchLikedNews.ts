import { LikedNewsGet, RatedNewsGetProps } from "@/service/News/LikedNewsGet";
import { GetNewsResProps, NewsType } from "@/service/News/NewsType";

type FetchLikedNewsProps = RatedNewsGetProps & {
  setNews?: (value: React.SetStateAction<NewsType[]>) => void | null;
  setTotal?: (value: React.SetStateAction<number>) => void | null;
  setStatus?: React.Dispatch<React.SetStateAction<number>>;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
};

async function FetchLikedNews({
  username,
  limit,
  page,
  search,
  setNews,
  setTotal,
  setStatus,
  setText,
  setError,
}: FetchLikedNewsProps) {
  await LikedNewsGet({ username, limit, page, search }).then(
    ({ count, news, pages, status }: GetNewsResProps) => {
      try {
        if (status == 500) {
          setStatus && setStatus(status);
          search
            ? setText &&
              setText(
                "We did not find any liked news items matching your request. :C"
              )
            : setText && setText("U don't have any liked news yet :C");
        } else {
          setStatus && setStatus(200);
        }
        setNews && setNews(news);
        setTotal && setTotal(pages);
      } catch (error: any) {
        setError && setError(error.message);
      }
    }
  );
}

export { FetchLikedNews };
