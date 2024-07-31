import { NextRequest, NextResponse } from "next/server";
import {
    LikeNews,UndislikeNews,UnlikeNews,CheckDislike,CheckLike
} from "../service/grades";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const news_id = Number(body.news_id);
        const username = body.username;

        const like_check = await CheckLike(news_id, username);
        const dislike_check = await CheckDislike(news_id, username);

        if (!like_check) {
            if (dislike_check) {
                await UndislikeNews(news_id, username);
            }
            const like = await LikeNews(news_id, username);
            if (like) return NextResponse.json({ res: true }, { status: 200 });
        }
        await UnlikeNews(news_id, username);
        return NextResponse.json({ res: false }, { status: 200 });
    } catch (error) {
        console.log({ "like_news.error": error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
