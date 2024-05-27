import axios from 'axios';
import User from '../models/user';
import EmailMessage from '../models/emailMessage';
import Mailbox from '../models/mailbox';

export const syncEmails = async (user: any) => {
    try {
        const emailsResponse = await axios.get('https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });

        const emails = emailsResponse.data.value;

        for (const email of emails) {
            const emailMessage = new EmailMessage({
                userId: user._id,
                messageId: email.id,
                subject: email.subject,
                sender: {
                    name: email.from.emailAddress.name,
                    email: email.from.emailAddress.address,
                },
                recipients: email.toRecipients.map((recipient: any) => ({
                    name: recipient.emailAddress.name,
                    email: recipient.emailAddress.address,
                })),
                content: email.body.content,
                status: email.isRead ? 'read' : 'unread',
                receivedDate: email.receivedDateTime,
            });

            await emailMessage.save();
        }
    } catch (err) {
        console.error(err);
        throw new Error('Email synchronization failed');
    }
};
