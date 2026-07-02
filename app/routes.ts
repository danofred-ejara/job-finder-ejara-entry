import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),

  layout("./components/layouts/job-layout.tsx", [
    route("jobs", "./pages/jobs.tsx"),
    route("about-us", "./pages/about-us.tsx"),
  ]),
] satisfies RouteConfig;
