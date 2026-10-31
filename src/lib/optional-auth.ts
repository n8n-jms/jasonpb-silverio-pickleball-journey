/** Public requests must remain usable when browser session storage is blocked. */
export async function optionalAuthHeaders(readToken: () => Promise<string | undefined>) {
  try {
    const token = await readToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    // Protected server functions still validate authentication on the server.
    return {};
  }
}