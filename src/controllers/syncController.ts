import { Request, Response } from 'express';
import { syncEmails } from '../utils/syncUtils';
import User from '../models/user';

export const syncEmailData = async (req: Request, res: Response) => {
    const userId = req.body.userId; // Assuming userId is sent in the request body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        await syncEmails(user);
        res.status(200).send('Email data synchronized successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Email synchronization failed');
    }
};
