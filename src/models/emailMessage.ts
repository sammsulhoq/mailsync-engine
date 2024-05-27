import mongoose, { Document, Schema } from 'mongoose';

export interface IEmailMessage extends Document {
    userId: string; // Reference to the user
    messageId: string; // Unique ID for the email message
    subject: string;
    sender: { name: string; email: string };
    recipients: { name: string; email: string }[];
    content: string;
    status: string; // read, unread, flagged, etc.
    receivedDate: Date;
}

const EmailMessageSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    messageId: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    sender: {
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    recipients: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
        },
    ],
    content: { type: String, required: true },
    status: { type: String, required: true },
    receivedDate: { type: Date, required: true },
});

const EmailMessage = mongoose.model<IEmailMessage>('EmailMessage', EmailMessageSchema);
export default EmailMessage;
