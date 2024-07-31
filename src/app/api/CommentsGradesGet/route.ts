import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {id} = await req.json();
        const com = await db.query(`SELECT * FROM comments WHERE id = '${id}';`);
        if (com.rowCount)
            return NextResponse.json(
                { likes: com.rows[0].likes, dislikes: com.rows[0].dislikes },
                { status: 200 }
            );
        return NextResponse.json(
            { error: `Grades of comment #${id} doesn't exist` },
            { status: 500 }
        );
    } catch (error) {
        console.log({ "news[id].error": error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
