import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

// async function tweetDummyDB() {
//   const testAccount1 = await db.user.create({
//     data: {
//       username: 'imManager',
//       email: 'imManager@tweet.com',
//       password: '!Qz123!@#',
//     },
//   });
// }

export default db;
