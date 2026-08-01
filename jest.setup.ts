import "@testing-library/jest-dom";

// Radix UI (utilisé par Shadcn) a besoin de ces deux API navigateur,
// absentes de jsdom par défaut — sans ça, certains composants Radix plantent au test
window.ResizeObserver =
  window.ResizeObserver ||
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

Element.prototype.scrollIntoView = jest.fn();