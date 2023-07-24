import { NextApiRequest, NextApiResponse } from 'next';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  // res.status(200).json(body);
  return res.status(200).json({ name: 'John Doe' });
}
