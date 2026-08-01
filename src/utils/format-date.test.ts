import { formatDate } from "./format-date";

describe("formatDate", () => {
  it("formate une date en français (jour, mois abrégé, année)", () => {
    const result = formatDate("2026-07-30");
    expect(result).toBe("30 juil. 2026");
  });

  it("accepte aussi un objet Date, pas seulement une string", () => {
    const date = new Date(2026, 0, 15); // 15 janvier 2026 (mois 0 = janvier en JS)
    const result = formatDate(date);
    expect(result).toBe("15 janv. 2026");
  });
});