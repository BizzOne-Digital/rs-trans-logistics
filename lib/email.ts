import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendQuoteNotification(data: {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  freightType: string;
  pickupDate: string;
  deliveryDate: string;
  freightWeight: string;
  freightDimensions: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'rajneelsampat00@gmail.com';

  // Admin notification
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Blue River Logistics <noreply@blueriverlogistics.com>',
    to: adminEmail,
    subject: `New Quote Request from ${data.fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; padding: 30px; border-radius: 10px;">
        <div style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0;">Blue River Logistics</h1>
          <h2 style="color: #f97316; margin: 5px 0 0;">New Quote Request</h2>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; color: #94a3b8; width: 40%;">Name:</td><td style="padding: 8px; color: #ffffff;">${data.fullName}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Company:</td><td style="padding: 8px; color: #ffffff;">${data.companyName || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Phone:</td><td style="padding: 8px; color: #ffffff;">${data.phone}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Email:</td><td style="padding: 8px; color: #ffffff;">${data.email}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Pickup:</td><td style="padding: 8px; color: #ffffff;">${data.pickupLocation}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Delivery:</td><td style="padding: 8px; color: #ffffff;">${data.deliveryLocation}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Freight Type:</td><td style="padding: 8px; color: #f97316;">${data.freightType}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Pickup Date:</td><td style="padding: 8px; color: #ffffff;">${data.pickupDate || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Delivery Date:</td><td style="padding: 8px; color: #ffffff;">${data.deliveryDate || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Weight:</td><td style="padding: 8px; color: #ffffff;">${data.freightWeight || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Dimensions:</td><td style="padding: 8px; color: #ffffff;">${data.freightDimensions || 'N/A'}</td></tr>
        </table>
        ${data.message ? `<div style="margin-top: 20px; padding: 15px; background: #1e293b; border-radius: 5px;"><p style="color: #94a3b8; margin: 0 0 8px;">Message:</p><p style="color: #ffffff; margin: 0;">${data.message}</p></div>` : ''}
        <div style="margin-top: 20px; padding: 15px; background: #1e293b; border-radius: 5px; border-left: 3px solid #2563eb;">
          <p style="color: #94a3b8; margin: 0; font-size: 12px;">View this request in your admin panel at ${process.env.NEXT_PUBLIC_APP_URL}/admin/quote-requests</p>
        </div>
      </div>
    `,
  });

  // Customer confirmation
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Blue River Logistics <noreply@blueriverlogistics.com>',
    to: data.email,
    subject: 'Quote Request Received - Blue River Logistics',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; padding: 30px; border-radius: 10px;">
        <div style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0;">Blue River Logistics</h1>
        </div>
        <h2 style="color: #f97316;">Thank you, ${data.fullName}!</h2>
        <p style="color: #cbd5e1;">Your quote request has been received. Our team will review your shipment details and contact you shortly with a custom quote.</p>
        <div style="padding: 15px; background: #1e293b; border-radius: 5px; margin: 20px 0;">
          <p style="color: #94a3b8; margin: 0 0 5px;">Freight Route:</p>
          <p style="color: #ffffff; margin: 0; font-size: 18px;">${data.pickupLocation} → ${data.deliveryLocation}</p>
        </div>
        <p style="color: #cbd5e1;">If you have any questions, feel free to contact us:</p>
        <p style="color: #2563eb;">Phone: +1 236 514 6876</p>
        <p style="color: #2563eb;">Email: rajneelsampat00@gmail.com</p>
        <div style="margin-top: 20px; padding: 10px; border-top: 1px solid #1e293b;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">Blue River Logistics | 12542 Grove Crescent, Surrey, BC V3V 2L7, Canada</p>
        </div>
      </div>
    `,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'rajneelsampat00@gmail.com';

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Blue River Logistics <noreply@blueriverlogistics.com>',
    to: adminEmail,
    subject: `New Contact Message: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; padding: 30px; border-radius: 10px;">
        <div style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0;">Blue River Logistics</h1>
          <h2 style="color: #f97316; margin: 5px 0 0;">New Contact Message</h2>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; color: #94a3b8; width: 40%;">Name:</td><td style="padding: 8px; color: #ffffff;">${data.name}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Email:</td><td style="padding: 8px; color: #ffffff;">${data.email}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Phone:</td><td style="padding: 8px; color: #ffffff;">${data.phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Subject:</td><td style="padding: 8px; color: #f97316;">${data.subject}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #1e293b; border-radius: 5px;">
          <p style="color: #94a3b8; margin: 0 0 8px;">Message:</p>
          <p style="color: #ffffff; margin: 0;">${data.message}</p>
        </div>
      </div>
    `,
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Blue River Logistics <noreply@blueriverlogistics.com>',
    to: data.email,
    subject: 'Message Received - Blue River Logistics',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; padding: 30px; border-radius: 10px;">
        <h1 style="color: #2563eb;">Blue River Logistics</h1>
        <h2 style="color: #f97316;">Thank you for contacting us, ${data.name}!</h2>
        <p style="color: #cbd5e1;">We have received your message and will get back to you as soon as possible.</p>
        <p style="color: #cbd5e1;">Phone: +1 236 514 6876 | Email: rajneelsampat00@gmail.com</p>
      </div>
    `,
  });
}
