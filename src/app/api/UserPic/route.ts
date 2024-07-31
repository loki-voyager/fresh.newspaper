import db from "@/server/db";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const usersByName = await db.query(
            `SELECT image_data FROM users WHERE username = '${body.data}';`
        );
        if (usersByName.rowCount)
            return NextResponse.json({ pic: usersByName.rows[0] }, { status: 200 });
        const usersByMail = await db.query(
            `SELECT image_data FROM users WHERE email = '${body.data}';`
        );
        if (usersByMail.rowCount)
            return NextResponse.json({ pic: usersByMail.rows[0] }, { status: 200 });
        // console.log({ error: `UserType ${body.data} doesn't exist` }, { status: 500 });
        // return NextResponse.json(
        //   { error: `UserType ${body.data} doesn't exist` },
        //   { status: 500 }
        // );
        return NextResponse.json(
            { pic:[] },
            { status: 200 }
        );
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        // console.log({ "user_pic.delete": body });
        const { id, username } = body;
        let pic_delete;
        if (id) {
            pic_delete = await db.query(`UPDATE users
      SET image_data = array_remove(image_data, image_data[${id}])
      WHERE username = '${username}';
      `);
            // console.log({ "user_pic.delete.pic_delete with id": pic_delete });
        } else {
            pic_delete = await db.query(`UPDATE users
      SET image_data = ARRAY[]::text[]
      WHERE username = '${username}';
      `);
            // console.log({ "user_pic.delete.pic_delete": pic_delete });
        }
        if (pic_delete.rowCount)
            return NextResponse.json({ delete: true }, { status: 200 });
        return NextResponse.json({ error: `Pic doesn't exist` }, { status: 500 });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
    }
}
