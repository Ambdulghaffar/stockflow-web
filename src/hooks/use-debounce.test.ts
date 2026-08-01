import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // active les minuteurs simulés pour CE test
  });

  afterEach(() => {
    jest.useRealTimers(); // remet les vrais minuteurs après, pour ne pas affecter d'autres tests
  });

  it("retourne la valeur initiale immédiatement, sans attendre", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("ne met PAS à jour la valeur avant la fin du délai", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 500 } },
    );

    // On simule un changement de valeur, comme si l'utilisateur tapait une nouvelle lettre
    rerender({ value: "hello world", delay: 500 });

    // On avance le temps de SEULEMENT 300ms (moins que les 500ms requis)
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // La valeur ne doit PAS encore avoir changé
    expect(result.current).toBe("hello");
  });

  it("met à jour la valeur après la fin du délai", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 500 } },
    );

    rerender({ value: "hello world", delay: 500 });

    // Cette fois on avance le temps de 500ms complets
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // La valeur a bien été mise à jour
    expect(result.current).toBe("hello world");
  });

  it("annule le minuteur précédent si la valeur change encore avant la fin du délai", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );

    rerender({ value: "ab", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300); // on n'attend pas la fin
    });

    // L'utilisateur continue de taper AVANT que "ab" n'ait eu le temps de s'appliquer
    rerender({ value: "abc", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(500); // on laisse le nouveau minuteur aller au bout
    });

    // Seule la DERNIÈRE valeur ("abc") doit apparaître — "ab" n'a jamais été affiché
    expect(result.current).toBe("abc");
  });
});