import { NextRequest, NextResponse } from "next/server";
import {
    DislikeCom,UndislikeCom,CheckComLike,CheckComDislike,UnlikeCom
} from "../service/ComGrades";

export async function POST(req: NextRequest) {
    try {
        const { com_id, username } = await req.json();

        const like_check = await CheckComLike({com_id,username});
        const dislike_check = await CheckComDislike({com_id, username});

        if (!dislike_check) {
            if (like_check) {
                await UnlikeCom(com_id, username);
            }
            const dislike = await DislikeCom(com_id, username);
            if (dislike) return NextResponse.json({ res: true }, { status: 200 });
        }
        await UndislikeCom(com_id, username);
        console.log({like_check,dislike_check});
        return NextResponse.json({ res: false }, { status: 200 });
    } catch (error) {
        console.log({ com_dislike: error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
