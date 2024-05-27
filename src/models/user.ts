import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    outlookId: string;
    accessToken: string;
    refreshToken: string;
    localId: string; // Local ID for the user
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    outlookId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    localId: { type: String, required: true, unique: true }, // Local ID
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
