import jwt from "jsonwebtoken";
import { User } from "../models/models.js";
import userService from "../service/user-service.js";
import ApiError from "../utils/ErrorHandler.js";

export default async function (req, res, next) {
  const userToken = await req.headers.authorization;
  if (!userToken) {
    throw ApiError.UnAuthorizedError();
  }
  const user = await userService.getMe(userToken);

  if (user) {
    try {
      if (user.role === "ADMIN") {
        const adminUser = await User.findOne({
          where: { id: user.id }
        });
      } else {
        throw ApiError.UnAuthorizedError();
      }
      req.user = user;
      next();
    } catch (error) {
      next(ApiError.UnAuthorizedError());
    }
  }
}
