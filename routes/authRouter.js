import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema } from "../schemas/authSchemas.js";
import upload from "../middlewares/upload.js";

const registerMiddleware = validateBody(authRegisterSchema);

const authRouter = Router();

authRouter.post("/register", registerMiddleware, authControllers.register);

authRouter.post("/login", registerMiddleware, authControllers.login);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
