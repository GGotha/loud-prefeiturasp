import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../../externals/config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: {
    id: number;
    role: string;
  };
}

export default function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ success: false, msg: "Invalid Token" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    req.userId = sub.id;
    req.role = sub.role;

    return next();
  } catch (err) {
    return res.status(401).send({ success: false, msg: "Invalid Token" });
  }
}
