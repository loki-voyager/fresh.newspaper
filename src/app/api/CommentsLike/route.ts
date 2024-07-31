import { NextRequest, NextResponse } from "next/server";
import {
    LikeCom,UndislikeCom,UnlikeCom,CheckComLike,CheckComDislike
} from "../service/ComGrades";

export async function POST(req: NextRequest) {
    try {
        const { com_id, username } = await req.json();


        const like_check = await CheckComLike({com_id, username});

        const dislike_check = await CheckComDislike({com_id, username});

        if (!like_check) {
            if (dislike_check) {
                await UndislikeCom(com_id, username);
            }
            const like = await LikeCom(com_id, username);
            if (like) return NextResponse.json({ res: true }, { status: 200 });
        }
        await UnlikeCom(com_id, username);
        return NextResponse.json({ res: false }, { status: 200 });
    } catch (error) {
        console.log({ com_like: error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
