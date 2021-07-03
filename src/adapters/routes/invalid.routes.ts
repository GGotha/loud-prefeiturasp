import * as express from "express";
import { Request, Response, Router } from "express";

const InvalidRoutes: Router = express.Router();

const message = "Invalid route!";

InvalidRoutes.get("*", (req: Request, res: Response) =>
  res.status(404).send({ success: false, message })
);
InvalidRoutes.post("*", (req: Request, res: Response) =>
  res.status(404).send({ success: false, message })
);
InvalidRoutes.put("*", (req: Request, res: Response) =>
  res.status(404).send({ success: false, message })
);
InvalidRoutes.delete("*", (req: Request, res: Response) =>
  res.status(404).send({ success: false, message })
);
InvalidRoutes.patch("*", (req: Request, res: Response) =>
  res.status(404).send({ success: false, message })
);

export default InvalidRoutes;
