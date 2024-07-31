import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, page, limit, search } = await req.json();
    let noti;
    let request = `SELECT * FROM notifications `;
    let options = `WHERE username ILIKE '%${username}%' `;
    let order = ``;

    if (
      typeof search != "undefined" &&
      typeof search != undefined &&
      search.length > 0
    )
      options =
        options +
        `AND (body ILIKE '%${search}%' OR mention ILIKE '%${search}%' OR com_body ILIKE '%${search}%')`;

    if (page && limit) {
      const offset = page > 1 ? (page - 1) * limit : 0;
      order = ` ORDER BY id DESC LIMIT ${limit} OFFSET ${offset};`;
    } else {
      order = ` ORDER BY id DESC;`;
    }

    noti = await db.query(request + options + order);
    const count = Number(
      (await db.query(`SELECT COUNT(*) FROM notifications ${options}`)).rows[0]
        .count
    );
    const pages = Math.ceil(count / limit) || 1;

    return NextResponse.json(
      { noti: noti.rows, count, pages },
      { status: 200 }
    );
  } catch (error) {
    console.log({ "news.error": error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
