import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { UserCheck } from "@/service/User/UserCheck";
import { hashSync } from "bcrypt-ts";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, pic, first_name, last_name } =
      await req.json();
    const data = username || email;
    const check = await UserCheck({ data, password });
    if (check.status === 200 && check.exists == true) {
      return NextResponse.json(
        { error: `User already exist` },
        { status: 500 }
      );
    }

    const hash = hashSync(password, 8);

    const createUser = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, image_data)
    VALUES ($1,$2,$3,$4,$5,$6);`,
      [username, hash, first_name, last_name, email, pic]
    );

    if (createUser.rowCount)
      return NextResponse.json({ new_user: true }, { status: 200 });
    return NextResponse.json({ new_user: false }, { status: 500 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
