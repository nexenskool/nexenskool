export const contactEmailTemplate = ({
  name,
  email,
  phone,
  company,
  message,
}) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>📩 New Contact Message</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>

      <hr />

      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `;
};
