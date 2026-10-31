import { createMiddleware } from "@tanstack/react-start";
import { optionalAuthHeaders } from "./optional-auth";

export const bookingSafeAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
  const headers = await optionalAuthHeaders(async () => {
    // Import inside the guarded read: client initialization may itself throw
    // when privacy settings prevent access to localStorage.
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  });
  return next({ headers });
});