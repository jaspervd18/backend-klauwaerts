import { NextFunction, Request, Response } from "express";
import authz, { AuthzScopes } from "express-jwt-authz";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import { AppError } from "../exception/AppError";

const checkJwtTokenDev = auth({
	audience: process.env.AUTH0_AUDIENCE,
	issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

const checkJwtToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) throw new AppError(401, "No token provided");
	const accessToken = process.env.AUTH0_CLIENT_SECRET || "";
	jwt.verify(token, accessToken, (err) => {
		if (!err) return next();
		throw new AppError(401, "Invalid token");
	});
};

function checkScope(scopes: AuthzScopes) {
	return authz(scopes, {
		customScopeKey: "permissions",
		checkAllScopes: true,
		failWithError: true,
	});
}

export { checkJwtToken, checkJwtTokenDev, checkScope };
