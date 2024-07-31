import db from "@/server/db";
import { compareSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data, password } = await req.json();

    const checkUser = await db.query(
      `SELECT * FROM users WHERE (email = '${data}' OR username = '${data}');`
    );

    if (compareSync(password, checkUser.rows[0].password))
      return NextResponse.json({ user: checkUser.rows[0] }, { status: 200 });

    return NextResponse.json({ error: `User doesn't exist` }, { status: 500 });
  } catch (error) {
    console.log({ error: `${error}` }, { status: 400 });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { username } = await req.json();
    const user = await db.query(
      `DELETE FROM users * WHERE username='${username}';`
    );
    if (user.rowCount)
      return NextResponse.json(
        { user: `${username} was deleted` },
        { status: 200 }
      );
    return NextResponse.json({ error: `User doesn't exist` }, { status: 500 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
