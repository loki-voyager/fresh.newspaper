import db from "@/server/db";
import { compareSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data, password } = await req.json();

    console.log({ data, password });

    const checkPass = await db.query(
      `SELECT * FROM users WHERE (username = '${data}' OR email = '${data}');`
    );

    if (checkPass.rows.length == 0) {
      return NextResponse.json({ exists: false }, { status: 500 });
    }

    if (compareSync(password, checkPass.rows[0].password))
      return NextResponse.json({ exists: true }, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
