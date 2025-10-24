import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const note = formData.get("note");
    const file = formData.get("cv"); // input name="cv"

    let attachments = [];

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Config transporter Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password Gmail
      },
    });

    // Content mail
    const mailOptions = {
      from: `"SMADS Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, 
      subject: "📩 Hồ sơ ứng tuyển mới từ website SMADS",
      html: `
        <h3>Thông tin ứng viên</h3>
        <p><strong>Họ và tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Ghi chú:</strong> ${note || "Không có"}</p>
      `,
      attachments,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Lỗi gửi mail:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
