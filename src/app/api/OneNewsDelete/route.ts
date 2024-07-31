import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const {id} = await req.json();
        const delete_news = await db.query(`DELETE FROM news WHERE id = ${id};`);
        if (delete_news.rowCount)
            return NextResponse.json({ delete_news: true }, { status: 200 });
        return NextResponse.json(
            { error: `News ${id} doesn't exist` },
            { status: 500 }
        );
    } catch (error) {
        console.log({ "news[id].delete.error": error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
