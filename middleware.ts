
import { next } from "@vercel/functions";

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Allow login page and login/logout API
  if (
    path === "/login.html" ||
    path === "/api/login" ||
    path === "/api/logout"
  ) {
    return next();
  }

  // Allow browser/site utility files if needed
  if (
    path === "/favicon.ico" ||
    path === "/robots.txt"
  ) {
    return next();
  }

  const cookie = request.headers.get("cookie") || "";

  const loggedIn = cookie
    .split(";")
    .some(c => c.trim() === "site_auth=authenticated");

  if (!loggedIn) {
    const loginUrl = new URL("/login.html", request.url);

    // Remember where user was trying to go
    loginUrl.searchParams.set("next", path);

    return Response.redirect(loginUrl, 302);
  }

  return next();
}
