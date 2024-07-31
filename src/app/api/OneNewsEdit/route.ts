import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { id,title, body, image_data } = await req.json();

        let edit_news;

        if (image_data) {
            edit_news = await db.query(
                `UPDATE news SET title=$1, body=$2, image_data=$3 WHERE id=$4;`,
                [title, body, image_data,id]
            );
        } else {
            edit_news = await db.query(
                `UPDATE news SET title=$1, body=$2 WHERE id=$3;`,
                [title, body, id]
            );
        }
        if (edit_news.rowCount)
            return NextResponse.json({ edit_news: true }, { status: 200 });
        return NextResponse.json({ edit_news: false }, { status: 500 });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
