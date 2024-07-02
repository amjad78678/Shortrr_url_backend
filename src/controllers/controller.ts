import { Request, Response } from "express";

async function Home(req: Request, res: Response) {
  res.send("Hello World!");
}

export { Home };
