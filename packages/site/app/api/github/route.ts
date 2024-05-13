import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user");
  if (user) {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=50`
    );
    const data = await res.json();
    return NextResponse.json({ data });
  }
  return NextResponse.json({ message: "Nothing to to here" });
}
