import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
type IMethod = 'POST' | 'PUT' | 'DELETE' | 'GET';

export const fetchWrapper = (basePath: string, path: string, method: IMethod, data: any, headers?: HeadersInit) => {
    return fetch(`${basePath}${path}`, {
        method: 'POST',
        body: JSON.stringify({
            data,
        }),
        headers: headers
            ? headers
            : {
                  'Content-type': 'application/json; charset=UTF-8',
              },
    });
};

export const getCookies = () => cookies();

export const decodeJWT = (token: string) => {
    // await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || 'shhhhh');
    let decodedData = undefined;
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || '', function (err, decoded) {
        if (err) {
            console.log('err >>', err);
        }
        if (decoded) {
            decodedData = decoded;
            console.log('decoded >>', decoded, typeof decoded);
        }
    });
    return decodedData;
};

