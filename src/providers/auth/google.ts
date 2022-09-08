import axios from 'axios';
import { join } from 'path';
import { writeFile, readdir, readFile } from 'fs/promises';
// import jwt from "jsonwebtoken";
import qs from 'qs';
import path from 'path';

async function setTokenEnv() {
    const dir = await readdir(path.join(__dirname, '../../..'));

    if (dir.includes('token.txt')) {
        const token = await readFile(path.join(__dirname, '../../..', 'token.txt'), 'utf8');
        process.env.token = token;
    }
}

async function auth(): Promise<{ access_token: string; expires_in: number; token_type: string }> {
    // const generateJWT = () => {
    // 	const iat = Date.now() / 1000;
    // 	const exp = iat + 3600;

    // 	return jwt.sign(
    // 		{
    // 			iss: process.env.CLIENT_EMAIL,
    // 			scope: "https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly",
    // 			aud: process.env.TOKEN_URI,
    // 			exp,
    // 			iat
    // 		},
    // 		process.env.PRIVATE_KEY,
    // 		{ algorithm: "RS256" }
    // 	);
    // };

    // const data = qs.stringify({
    // 	grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    // 	assertion: generateJWT()
    // });
    console.log('REFRESHING TOKEN...');
    const data = qs.stringify({
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: process.env.REFRESH_TOKEN,
        client_id: process.env.CLIENT_ID,
    });

    console.log(process.env.TOKEN_URI);

    const jwtGoogle = await axios.post(
        process.env.TOKEN_URI || 'https://oauth2.googleapis.com/token',
        data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    );

    await writeFile(join(__dirname, '../../..', 'token.txt'), jwtGoogle.data.access_token, 'utf8');
    console.log('TOKEN REFRESHED.');
    return jwtGoogle.data;
}

export { auth, setTokenEnv };
