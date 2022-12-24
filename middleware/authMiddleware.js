import ApiError from "../utils/ErrorHandler.js";
import tokenService from "../service/token-service.js";
export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw ApiError.UnAuthorizedError();
    }
    const accessToken = authorizationHeader.substring("Bearer ".length);

    if (!accessToken) {
      throw ApiError.UnAuthorizedError();
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.UnAuthorizedError();
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnAuthorizedError());
  }
}
