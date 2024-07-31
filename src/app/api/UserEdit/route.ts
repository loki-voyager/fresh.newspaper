import db from "@/server/db";
import { hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      pic,
      old_username,
    } = await req.json();
    let edit;

    const hash = hashSync(password, 8);

    edit = await db.query(
      `UPDATE users SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5, image_data = $6 WHERE username = $7;`,
      [username, hash, first_name, last_name, email, pic, old_username]
    );

    if (edit.rowCount) return NextResponse.json(true);

    return NextResponse.json(false);
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
