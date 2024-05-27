import { Request, Response } from 'express';
import { getOAuthTokens, findOrCreateUser } from '../utils/authUtils';

export const login = (req: Request, res: Response) => {
    const authorizationUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=offline_access%20user.read%20mail.read`;
    res.redirect(authorizationUrl);
};

export const callback = async (req: Request, res: Response) => {
    const { code } = req.query;

    try {
        const { access_token, refresh_token } = await getOAuthTokens(code as string);
        const user = await findOrCreateUser(access_token, refresh_token);

        res.status(200).json({
            message: 'Authentication successful',
            user: {
                email: user.email,
                outlookId: user.outlookId,
                localId: user.localId,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'OAuth callback error', error: err.message });
    }
};
