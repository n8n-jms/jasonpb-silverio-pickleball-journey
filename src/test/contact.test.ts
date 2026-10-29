import { expect, it } from "vitest";
import { CONTACT_EMAIL } from "@/lib/contact";

it("uses Jason's requested Gmail contact address", () => {
  expect(CONTACT_EMAIL).toBe("silverio.jason@gmail.com");
});