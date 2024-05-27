import axios from 'axios';
import User from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.OUTLOOK_CLIENT_ID!;
const clientSecret = process.env.OUTLOOK_CLIENT_SECRET!;
const redirectUri = process.env.CALLBACK_URL!;

export const getOAuthTokens = async (code: string) => {
    try {
        const tokenResponse = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', null, {
            params: {
                client_id: clientId,
                scope: 'offline_access user.read mail.read',
                code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
                client_secret: clientSecret,
            },
        });

        return tokenResponse.data;
    } catch (err) {
        console.error('Error fetching OAuth tokens:', err);
        throw err;
    }
};

export const findOrCreateUser = async (accessToken: string, refreshToken: string) => {
    try {
        const userResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const { id, mail } = userResponse.data;

        let user = await User.findOne({ outlookId: id });
        if (!user) {
            user = new User({
                email: mail,
                outlookId: id,
                accessToken,
                refreshToken,
                localId: id, // or generate a unique local ID
            });
            await user.save();
        } else {
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            await user.save();
        }

        return user;
    } catch (err) {
        console.error('Error fetching user data:', err);
        throw err;
    }
};
