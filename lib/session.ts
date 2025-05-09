import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
    id?: number;
}

async function getSession() {
    return getIronSession<SessionContent>(cookies(), {
        cookieName: 'mytweet',
        password: process.env.COOKIE_PASSWORD!,
    });
}

export default getSession;
