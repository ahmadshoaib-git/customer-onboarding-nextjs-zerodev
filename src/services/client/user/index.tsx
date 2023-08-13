import { IUser } from './user.interface';
import { fetchWrapper } from '../../../utils/helpers';
import { getBaseUrl } from '@/utils';
import { StringChunk } from 'drizzle-orm';

export class UserClientService {
    static async registerUser(user: IUser) {
        try {
            return await fetch(`${getBaseUrl()}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
        } catch (error) {
            console.error('Error calling API:', error);
            throw error;
        }
    }
    static async loginUser(email: string, password: string) {
        try {
            return fetch(`${getBaseUrl()}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
        } catch (error) {
            console.error('Error calling API:', error);
            throw error;
        }
    }
    static async verifyUser(token: string, otp: string) {
        try {
            return fetch(`${getBaseUrl()}/api/verifyOtp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({
                    otp: otp,
                }),
            });
        } catch (error) {
            console.error('Error calling API:', error);
            throw error;
        }
    }
    static async verifyUserLogout(token: string) {
        try {
            return await fetch(`${getBaseUrl()}/api/verifyOtp/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
        } catch (error) {
            console.error('Error calling API:', error);
            throw error;
        }
    }
}

