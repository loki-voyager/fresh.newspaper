import {Metadata} from "next";
import {GetOneNews} from "@/service/News/OneNews/OneNewsGet";
import {NewsType} from "@/service/News/NewsType";
import {OneNewsContainer} from "@/components/News/OneNews/OneNewsContainer";

export async function generateMetadata(
    {
        params: {id},
    }: Props): Promise<Metadata> {
    const post = await GetOneNews({id});

    return {
        title: post.title,
    };
}

type Props = {
    params: {
        id: number;
    };
};

export default async function New({params: {id}}: Props) {
    const news: NewsType = await GetOneNews({id});

    return (
        <>
            <div className="wrapper">
                <OneNewsContainer news={news}/>
            </div>
        </>
    );
}
