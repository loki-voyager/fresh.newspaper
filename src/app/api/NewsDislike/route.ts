import {NextRequest, NextResponse} from "next/server";
import {
     UndislikeNews, DislikeNews, CheckLike, UnlikeNews, CheckDislike
} from "../service/grades";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const news_id = Number(body.news_id);
        const username = body.username;

        const dislike_check = await CheckDislike(news_id, username);
        const like_check = await CheckLike(news_id, username);

        if (!dislike_check) {
            if (like_check) {
                await UnlikeNews(news_id, username);
            }
            const dislike = await DislikeNews(news_id, username);
            if (dislike) return NextResponse.json({res: true}, {status: 200});
        }
        await UndislikeNews(news_id, username);
        return NextResponse.json({res: false}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: `${error}`}, {status: 400});
    }
}
