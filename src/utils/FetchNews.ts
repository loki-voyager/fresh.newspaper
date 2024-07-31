import {
  GetNewsProps,
  GetNewsResProps,
  NewsType,
} from "@/service/News/NewsType";
import { GetNews } from "@/service/News/NewsGet";

type FetchNewsProps = GetNewsProps & {
  setNews?: (value: React.SetStateAction<NewsType[]>) => void | null;
  setTotal?: (value: React.SetStateAction<number>) => void | null;
  setStatus?: React.Dispatch<React.SetStateAction<number>>;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
};

async function FetchNews({
  page,
  limit,
  search,
  setNews,
  setTotal,
  setStatus,
  setText,
  setError,
}: FetchNewsProps) {
  try {
    await GetNews({
      page,
      limit,
      search,
    }).then(({ count, news, pages, status }: GetNewsResProps) => {
      if (status == 500) {
        setStatus && setStatus(status);
        search
          ? setText &&
            setText("We did not find any news items matching your request. :C")
          : setText && setText("We don't have any news yet :C");
      } else {
        setStatus && setStatus(200);
      }
      setNews && setNews(news);
      setTotal && setTotal(pages);
    });
  } catch (error: any) {
    setError && setError(error.message);
  }
}

export { FetchNews };

export type { FetchNewsProps };
