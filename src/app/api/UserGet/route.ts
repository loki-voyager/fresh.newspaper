import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page, limit, username } = await body;
    let users;
    let request = `SELECT * FROM users `;
    let options = ``;
    let order = ``;

    if (
      typeof username != "undefined" &&
      typeof username != undefined &&
      username.length > 0
    ) {
      options = `WHERE username ILIKE '%${username}%'`;
    }

    if (page && limit) {
      order = ` ORDER BY id DESC LIMIT ${limit} OFFSET ${(page - 1) * limit};`;
    } else {
      order = ` ORDER BY id DESC;`;
    }

    const count = Number(
      (await db.query(`SELECT COUNT(*) FROM users ${options}`)).rows[0].count
    );
    users = await db.query(request + options + order);

    const pages = Math.ceil(count / limit) || 1;

    return NextResponse.json(
      {
        users: users.rows,
        count,
        pages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log({ "users.error": error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
