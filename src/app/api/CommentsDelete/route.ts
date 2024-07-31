import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        console.log({id});
        const deleted = await db.query(`DELETE FROM comments WHERE id = ${id};`);
        console.log({deleted});
        if (deleted.rowCount)
            return NextResponse.json({ deleted: true }, { status: 200 });
        return NextResponse.json({ deleted: false }, { status: 500 });
    } catch (error) {
        console.log({ comment_delete: error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}