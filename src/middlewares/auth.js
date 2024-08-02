import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export async function auth(req, res, next) {
  if (typeof req.headers.authorization !== "string") {
    return next(createHttpError(401, "Please provide an authorization header"));
  }

  const [bearer, accessToken] = req.headers.authorization.split(" ", 2);

  if (bearer !== "Bearer" || typeof accessToken !== "string") {
    return next(
      createHttpError(401, "Authorization header should be type of Bearer")
    );
  }

  const session = await Session.findOne({ accessToken });
  if (session === null) {
    return next(createHttpError(401, "Session not found"));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, "Access token is expired"));
  }

  const user = await User.findOne({ _id: session.userId });

  if (user === null) {
    return next(createHttpError(401, "Session not found"));
  }

  req.user = user; // додаємо поле з користувачем

  next();
}
