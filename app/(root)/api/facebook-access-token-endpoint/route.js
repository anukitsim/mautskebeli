import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const request = await req.json();
    const user_access_token = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
    const { page_id } = request;

    const response = await fetch(
      `https://graph.facebook.com/v13.0/${page_id}?fields=access_token&access_token=${user_access_token}`
    );
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(
        { page_access_token: data.access_token },
        { status: 200 }
      );
    } else {
      throw new Error(
        `Error fetching page access token: ${data.error.message}`
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}
