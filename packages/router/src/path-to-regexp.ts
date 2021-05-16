export default function pathToRegexp(path: string): RegExp {
  return new RegExp(
    `^${path
      .replace(/(\/?)\*/g, "($1.*)?")
      .replace(/\/$/, "")
      .replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/$3]+)$2$3")}\/*$`
  );
}
