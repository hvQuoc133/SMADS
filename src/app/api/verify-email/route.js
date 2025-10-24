import { NextResponse } from "next/server";
import dns from "dns/promises";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ valid: false, error: "Email không hợp lệ" });
    }

    const domain = email.split("@")[1];

    try {
      const records = await dns.resolveMx(domain);
      if (!records || records.length === 0) {
        return NextResponse.json({ valid: false, error: "Domain email không tồn tại" });
      }
    } catch (err) {
      return NextResponse.json({ valid: false, error: "Domain email không tồn tại" });
    }

    return NextResponse.json({ valid: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ valid: false, error: err.message });
  }
}
