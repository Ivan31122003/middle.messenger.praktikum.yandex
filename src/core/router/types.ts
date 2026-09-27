export type Path =
  | "/"
  | "/5xx"
  | "/login"
  | "/registration"
  | "/messenger"
  | "/profile";

interface Page {
  type: "page";
  loader: () => Promise<{ default: string }>;
}

interface Redirect {
  type: "redirect";
  to: Path;
}

export type Route = Page | Redirect;
