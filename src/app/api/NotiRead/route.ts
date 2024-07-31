import {NextRequest, NextResponse} from "next/server";
import db from "@/server/db";

export async function POST(req: NextRequest) {
    try {
        let read
        const { id,username } = await req.json();
        const users = await db.query(`SELECT * FROM notifications where id='${id}' AND username ILIKE '%${username}%'`);
        if (users.rowCount)
            read = await db.query(`UPDATE notifications SET is_read = NOT is_read WHERE id = '${id}'`);
            if(read.rowCount) return NextResponse.json(true);
        return false;
    } catch (error) {
        console.log({ error: `${error}` }, { status: 400 });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}