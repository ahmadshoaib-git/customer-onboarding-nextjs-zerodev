import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { db } from '../config';
import { IUser } from '../../client/user/user.interface';
import { userSchema, User, NewUser, createUserScheme } from './user.schema';

export class UserService {
    static async createUser(user: NewUser) {
        try {
            const tempUser = { ...user };
            //hash password
            const salt = await bcrypt.genSalt(10); //genSalt will create a salt with the 10 rounds - Salt is a cryptographically secure random string that is added to a password before it's hashed,
            tempUser.userPassword = await bcrypt.hash(user.userPassword, salt);
            await createUserScheme();
            console.log(tempUser);
            const insertedUser = await db.insert(userSchema).values(tempUser).returning();
            return insertedUser;
        } catch (error) {
            console.log('========================================= >>>>>> createUser ');
            console.error('Error executing SQL query:', error);
            throw error;
        }
    }
    static async getUser(email: string) {
        try {
            const userData = await db.select().from(userSchema).where(eq(userSchema.email, email));
            return userData;
        } catch (error) {
            console.log('========================================= >>>>>> getUser');
            console.error('Error executing SQL query:', error);
            throw error;
        }
    }
    static async getTemporaryToken(id: number, firstName: string, lastName: string, email: string) {
        try {
            const accessToken = jwt.sign(
                {
                    id: id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                },
                process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || 'aa&aa-0-3dd*d',
                { expiresIn: 60 * 60 * 24 * 1 },
            );
            console.log('accessToken >', accessToken);
            return accessToken;
        } catch (error) {
            console.log('========================================= >>>>>> getTemporaryToken');
            console.error('Error generating temporary token:', error);
            return null;
        }
    }
    static async verifyUser(email: string) {
        try {
            await db.update(userSchema).set({ verified: true }).where(eq(userSchema.email, email));
        } catch (error) {
            console.log('========================================= >>>>>> verifyUser');
            console.error('Error executing SQL query:', error);
            throw error;
        }
    }
}

