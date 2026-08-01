import { categorySchema } from "./category-schema";

describe("categorySchema", () => {
  it("accepte des données complètement valides", () => {
    const result = categorySchema.safeParse({
      name: "Électronique",
      description: "Tous les produits électroniques.",
      imageUrl: "https://example.com/image.jpg",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un nom trop court (moins de 2 caractères)", () => {
    const result = categorySchema.safeParse({
      name: "A",
      description: "",
      imageUrl: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Le nom de la catégorie doit contenir au moins 2 caractères.",
      );
    }
  });

  it("rejette un nom trop long (plus de 100 caractères)", () => {
    const result = categorySchema.safeParse({
      name: "A".repeat(101),
      description: "",
      imageUrl: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejette une description trop longue (plus de 500 caractères)", () => {
    const result = categorySchema.safeParse({
      name: "Électronique",
      description: "A".repeat(501),
      imageUrl: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepte une description VIDE (aucune contrainte minimale sur ce champ)", () => {
    const result = categorySchema.safeParse({
      name: "Électronique",
      description: "",
      imageUrl: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejette une imageUrl qui n'est pas une URL valide", () => {
    const result = categorySchema.safeParse({
      name: "Électronique",
      description: "",
      imageUrl: "pas-une-url",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Veuillez entrer une URL valide.");
    }
  });

  it("accepte une imageUrl vide (chaîne vide autorisée explicitement)", () => {
    const result = categorySchema.safeParse({
      name: "Électronique",
      description: "",
      imageUrl: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepte l'absence totale d'imageUrl (champ optionnel)", () => {
    const result = categorySchema.safeParse({
      name: "Électronique",
      description: "",
    });
    expect(result.success).toBe(true);
  });
});