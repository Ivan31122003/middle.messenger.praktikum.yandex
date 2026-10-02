export type Path =
  | "/"
  | "/5xx"
  | "/login"
  | "/registration"
  | "/messenger"
  | "/profile-info"
  | "/profile-change-data"
  | "/profile-change-password";

interface Page {
  type: "page";
  loader: () => Promise<{ default: string }>;
  data?: unknown;
}

interface Redirect {
  type: "redirect";
  to: Path;
}

export type Route = Page | Redirect;
