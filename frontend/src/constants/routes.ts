const routes = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
  ADMIN: "/admin",
  PREDICTLOGS: "/predict-logs",
  MANAGEMENTADMIN: "/management/admin",
} as const;

export type RouteKey = keyof typeof routes;

export default routes;
