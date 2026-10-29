import { describe, expect, it } from "vitest";
import { availableStartTimes, COACHING_DAYS, CLOSING_HOUR, OPENING_HOUR, isValidSessionTime } from "@/lib/coaching-schedule";

describe("Jason's coaching availability", () => {
  it("opens at 6 AM", () => {
    expect(OPENING_HOUR).toBe(6);
    expect(availableStartTimes(2)[0]).toBe("6:00 AM");
    expect(isValidSessionTime("5:00 AM", 2)).toBe(false);
  });
  it("closes at 10 PM and keeps the whole session within those hours", () => {
    expect(CLOSING_HOUR).toBe(22);
    expect(isValidSessionTime("8:00 PM", 2)).toBe(true);
    expect(isValidSessionTime("9:00 PM", 2)).toBe(false);
    expect(availableStartTimes(6).at(-1)).toBe("4:00 PM");
  });
  it("allows Monday through Sunday", () => {
    expect(COACHING_DAYS).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });
});