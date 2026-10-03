import { components, paths } from "../types/schema";

export type Schema<T extends keyof components["schemas"]> =
  components["schemas"][T];

export type ApiResponse<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  responses: { 200: { content: { "application/json": infer R } } };
}
  ? R
  : never;
