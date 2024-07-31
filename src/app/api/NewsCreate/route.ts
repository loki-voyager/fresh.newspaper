import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { title, body, username, image_data } = await req.json();
        console.log({ title, body, username, image_data });

        let create_news;

        if (image_data) {
            create_news = await db.query(
                `INSERT INTO news (title, body, username, image_data) VALUES ($1,$2,$3,$4);`,
                [title, body, username, image_data]
            );
        } else {
            create_news = await db.query(
                `INSERT INTO news (title, body, username) VALUES ($1,$2,$3);`,
                [title, body, username]
            );
        }
        if (create_news.rowCount)
            return NextResponse.json({ new_news: true }, { status: 200 });
        return NextResponse.json({ new_news: false }, { status: 500 });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
