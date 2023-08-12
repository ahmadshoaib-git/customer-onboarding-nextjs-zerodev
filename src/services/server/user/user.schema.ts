import { sql } from '@vercel/postgres';
import { InferModel } from 'drizzle-orm';
import { boolean, pgTable, serial, timestamp, varchar, text } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: varchar('firstname', { length: 60 }).notNull(),
    lastName: varchar('lastname', { length: 60 }).notNull(),
    dob: varchar('dob', { length: 20 }).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    verified: boolean('verified'),
    createdDate: timestamp('createddate').defaultNow(),
    userPassword: varchar('userpassword', { length: 20 }).notNull(),
    otp: varchar('otp', { length: 6 }),
});

export const createUserScheme = async () =>
    await sql`CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        dob VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT false,
        createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        userPassword VARCHAR(255) NOT NULL,
        otp VARCHAR(255) NOT NULL
);`;

export type User = InferModel<typeof userSchema>;
export type NewUser = InferModel<typeof userSchema, 'insert'>;

