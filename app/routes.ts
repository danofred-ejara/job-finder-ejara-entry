import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),

  layout("./components/layouts/auth-layout.tsx", [
    route("auth/login", "pages/auth/login.tsx"),
  ]),

  layout("./components/layouts/job-layout.tsx", [
    route("jobs", "./pages/jobs.tsx"),
    route("about-us", "./pages/about-us.tsx"),
    route("settings", "pages/settings.tsx"),
  ]),

  ...prefix("api", [
    route("auth/session", "pages/api/auth/session.ts"),
    route("auth/logout", "pages/api/auth/logout.ts"),
  ]),
] satisfies RouteConfig;
