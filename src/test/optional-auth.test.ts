import { expect, it, vi } from "vitest";
import { optionalAuthHeaders } from "@/lib/optional-auth";

it("lets public booking requests continue when browser storage is blocked", async () => {
  const blocked = vi.fn().mockRejectedValue(new DOMException("Storage blocked", "SecurityError"));
  await expect(optionalAuthHeaders(blocked)).resolves.toEqual({});
  expect(blocked).toHaveBeenCalledOnce();
});

it("lets visitors without an account submit booking requests", async () => {
  await expect(optionalAuthHeaders(async () => undefined)).resolves.toEqual({});
});

it("preserves bearer attachment when a session exists", async () => {
  await expect(optionalAuthHeaders(async () => "test-session-token")).resolves.toEqual({
    Authorization: "Bearer test-session-token",
  });
});