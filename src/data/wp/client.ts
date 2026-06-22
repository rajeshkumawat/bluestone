/**
 * Minimal WPGraphQL client. Endpoint is overridable via env so the same
 * code works in dev, build, and CI.
 */
const env: any = (import.meta as any).env ?? {};
const WP_GRAPHQL_URL =
  env.WP_GRAPHQL_URL ?? "https://bluestone-wp.designinx.com/graphql";

export async function wpQuery<T = any>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`WPGraphQL HTTP ${res.status} at ${WP_GRAPHQL_URL}`);
  const json = await res.json();
  if (json.errors) {
    throw new Error("WPGraphQL errors: " + JSON.stringify(json.errors));
  }
  return json.data as T;
}
