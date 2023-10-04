// src/pages/api/auth/login.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  return res.status(200).json({ success: true, message: "success" });
};
