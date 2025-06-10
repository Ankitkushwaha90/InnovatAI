// app/api/contacts/route.ts
import { connectToDB } from '@/lib/mongoose';
import Contact from '@/models/Contact';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch contacts', error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const newContact = new Contact(body);
    await newContact.save();
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create contact', error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDB();
    const { _id, ...updateData } = await request.json();
    const updatedContact = await Contact.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    return NextResponse.json(updatedContact);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update contact', error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDB();
    const { _id } = await request.json();
    await Contact.findByIdAndDelete(_id);
    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete contact', error },
      { status: 500 }
    );
  }
}