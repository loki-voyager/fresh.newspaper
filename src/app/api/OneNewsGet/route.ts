import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {id} = await req.json();
        const news = await db.query(`SELECT * FROM news WHERE id = '${id}';`);
        if (news.rowCount)
            return NextResponse.json({ news:news.rows[0] }, { status: 200 });
        return NextResponse.json(
            { error: `News ${id} doesn't exist` },
            { status: 500 }
        );
    } catch (error) {
        console.log({ "news[id].error": error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
