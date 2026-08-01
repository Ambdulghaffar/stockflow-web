import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmationDialog from "./confirmation-dialog";

describe("ConfirmationDialog", () => {
  it("affiche l'icône de suppression, sans le message de confirmation au départ", () => {
    render(<ConfirmationDialog onConfirm={jest.fn()} />);

    expect(screen.getByLabelText("Supprimer")).toBeInTheDocument();
    // Le texte de confirmation ne doit PAS encore être visible avant le clic
    expect(screen.queryByText("Êtes-vous absolument sûr ?")).not.toBeInTheDocument();
  });

  it("affiche le message de confirmation après avoir cliqué sur l'icône", async () => {
    const user = userEvent.setup();
    render(<ConfirmationDialog onConfirm={jest.fn()} />);

    await user.click(screen.getByLabelText("Supprimer"));

    expect(screen.getByText("Êtes-vous absolument sûr ?")).toBeInTheDocument();
    expect(
      screen.getByText("Cette action est irréversible. L'élément sera définitivement supprimé."),
    ).toBeInTheDocument();
  });

  it("appelle onConfirm quand on clique sur 'Continuer'", async () => {
    const user = userEvent.setup();
    const handleConfirm = jest.fn();
    render(<ConfirmationDialog onConfirm={handleConfirm} />);

    await user.click(screen.getByLabelText("Supprimer"));
    await user.click(screen.getByRole("button", { name: "Continuer" }));

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("n'appelle PAS onConfirm quand on clique sur 'Annuler'", async () => {
    const user = userEvent.setup();
    const handleConfirm = jest.fn();
    render(<ConfirmationDialog onConfirm={handleConfirm} />);

    await user.click(screen.getByLabelText("Supprimer"));
    await user.click(screen.getByRole("button", { name: "Annuler" }));

    expect(handleConfirm).not.toHaveBeenCalled();
  });

  it("désactive le bouton 'Continuer' quand disabled=true", async () => {
    const user = userEvent.setup();
    render(<ConfirmationDialog onConfirm={jest.fn()} disabled={true} />);

    await user.click(screen.getByLabelText("Supprimer"));

    expect(screen.getByRole("button", { name: "Continuer" })).toBeDisabled();
  });
});