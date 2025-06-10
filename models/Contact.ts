// models/Contact.ts
import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  projectType: {
    type: String,
    enum: ['AI Model', 'ML Pipeline', 'Data Analysis', 'Other'],
    required: [true, 'Project type is required'],
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;