import { truncateText } from "./truncate-text";

describe("truncateText", () => {
  it("ne modifie pas un texte plus court que la limite", () => {
    const result = truncateText("Courte description", 50);
    expect(result).toBe("Courte description");
  });

  it("coupe un texte plus long que la limite et ajoute des points de suspension", () => {
    const result = truncateText(
      "Ceci est un texte vraiment beaucoup trop long pour être affiché entièrement",
      20,
    );
    expect(result).toBe("Ceci est un texte vr...");
    expect(result.length).toBe(23); // 20 caractères + "..."
  });

  it("utilise 20 comme longueur par défaut si maxLength n'est pas fourni", () => {
    const longText = "a".repeat(30); // une chaîne de 30 lettres "a"
    const result = truncateText(longText);
    expect(result).toBe("a".repeat(20) + "...");
  });

  it("renvoie une chaîne vide si le texte est vide, sans planter", () => {
    expect(truncateText("", 20)).toBe("");
  });

  it("renvoie une chaîne vide si le texte est undefined, sans planter", () => {
    // @ts-expect-error — on teste volontairement un cas invalide selon TypeScript,
    // pour vérifier que la fonction est robuste même face à une mauvaise utilisation
    expect(truncateText(undefined, 20)).toBe("");
  });
});
