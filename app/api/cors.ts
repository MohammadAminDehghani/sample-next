import { NextApiRequest, NextApiResponse } from 'next';
//import cors from 'cors';
import cors from 'cors';

// Initialize the cors middleware
const corsMiddleware = cors({
  origin: 'http://localhost:3000', // Replace with your Next.js app's URL
  credentials: true,
});

// Helper function to wrap the cors middleware
export default function withCors(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await new Promise((resolve, reject) => {
      corsMiddleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });

    return handler(req, res);
  };
}