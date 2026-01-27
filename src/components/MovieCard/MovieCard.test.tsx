import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { MovieCard } from "./MovieCard";
import { FavoritesProvider } from "../../contexts/FavoritesContext";

const mockMovie = {
    id: 1,
    title: "Matrix",
    release_date: "1999-03-31",
    vote_average: 8.7,
    poster_path: "/poster.jpg",
    overview: "Um hacker descobre a verdade.",
    genre_ids: [28, 878]
};

function renderCard() {
    return render(
        <MemoryRouter>
            <FavoritesProvider>
                <MovieCard movie={mockMovie} />
            </FavoritesProvider>
        </MemoryRouter>
    );
}

describe("MovieCard", () => {
    it("exibe o título do filme", () => {
        renderCard();
        expect(screen.getByText("Matrix")).toBeInTheDocument();
    });

    it("exibe o ano extraído da data de lançamento", () => {
        renderCard();
        expect(screen.getByText("1999")).toBeInTheDocument();
    });

    it("exibe a nota formatada com uma casa decimal", () => {
        renderCard();
        expect(screen.getByText("⭐ 8.7")).toBeInTheDocument();
    });

    it("renderiza a imagem do poster com alt correto", () => {
        renderCard();
        const img = screen.getByAltText("Matrix");
        expect(img).toBeInTheDocument();
    });

    it("contém link para a página de detalhes", () => {
        renderCard();
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/movie/1");
    });
});
