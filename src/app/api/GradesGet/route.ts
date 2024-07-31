import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {id} = await req.json();
        const news = await db.query(`SELECT * FROM news WHERE id = '${id}';`);
        if (news.rowCount)
            return NextResponse.json({ likes:news.rows[0].likes,dislikes:news.rows[0].dislikes }, { status: 200 });
        return NextResponse.json(
            { error: `Grades of news #${id} doesn't exist` },
            { status: 500 }
        );
    } catch (error) {
        console.log({ "news[id].error": error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
