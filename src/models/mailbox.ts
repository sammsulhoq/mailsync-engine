import mongoose, { Document, Schema } from 'mongoose';

export interface IMailbox extends Document {
    userId: string; // Reference to the user
    mailboxId: string; // Unique ID for the mailbox
    name: string; // Name of the mailbox (e.g., Inbox, Sent)
    emailAddress: string; // Email address associated with the mailbox
}

const MailboxSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mailboxId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    emailAddress: { type: String, required: true },
});

const Mailbox = mongoose.model<IMailbox>('Mailbox', MailboxSchema);
export default Mailbox;
