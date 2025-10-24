import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ success: false, error: "Thiếu thông tin" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Config transporter Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Content mail
    const mailOptions = {
      from: `"SMADS Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📩 Contact Form: ${subject}`,
      html: `
        <h3>Thông tin liên hệ từ website</h3>
        <p><strong>Họ và tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Lỗi gửi mail contact:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
