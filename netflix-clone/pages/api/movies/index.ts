import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    await serverAuth(req);

    const movies = await prismadb.movie.findMany({});

    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
