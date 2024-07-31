import { NewsList } from "@/components/News/News";
import { FetchNews } from "@/utils/FetchNews";

export default async function News() {
  return (
    <>
      <div className="wrapper">
        <NewsList />
      </div>
    </>
  );
}
