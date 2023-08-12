import { z } from 'zod';

export const userValidator = z
    .object({
        firstName: z.string().nonempty(),
        lastName: z.string().nonempty(),
        dob: z.string().nonempty(),
        email: z.string().email().nonempty(),
        password: z.string().nonempty(),
    })
    .strict();

