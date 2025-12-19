const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Email service function
const sendContactEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">New Contact Form Submission</h2>
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #4CAF50;">${email}</a></p>
          <p style="margin: 10px 0;"><strong style="color: #555;">Subject:</strong> ${subject}</p>
        </div>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;"><strong style="color: #555;">Message:</strong></p>
          <p style="margin: 10px 0; line-height: 1.6; color: #333;">${message}</p>
        </div>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
          <p>Received: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
};

// MongoDB Contact Schema
const contactSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// MongoDB connection
let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('✅ Using existing MongoDB connection');
    console.log('Database:', mongoose.connection.db.databaseName);
    return;
  }

  try {
    let mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined');
    }

    // Ensure the URI includes the portfolio database
    if (!mongoUri.includes('/portfolio?')) {
      mongoUri = mongoUri.replace(/\/\?/, '/portfolio?');
      if (!mongoUri.includes('?')) {
        mongoUri = mongoUri + '/portfolio';
      }
    }

    console.log('Connecting to MongoDB...');

    await mongoose.connect(mongoUri);

    isConnected = true;
    console.log('✅ MongoDB Connected Successfully');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Collection will be: contacts');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    isConnected = false;
    throw error;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    console.log('📝 Creating contact entry...');
    console.log('Data:', { name, email, subject });

    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    const savedContact = await newContact.save();

    console.log('✅ Contact saved successfully!');
    console.log('ID:', savedContact._id);
    console.log('Token:', savedContact.tokenId);
    console.log('Database:', mongoose.connection.db.databaseName);

    // Send email notification
    try {
      await sendContactEmail({ name, email, subject, message });
      console.log('📧 Email notification sent successfully');
    } catch (emailError) {
      console.error('⚠️ Email sending failed, but contact was saved:', emailError.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      contactId: savedContact._id,
      tokenId: savedContact.tokenId
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send message. Please try again.'
    });
  }
};

