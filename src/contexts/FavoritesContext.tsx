import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/movie";

interface FavoritesContextType {
    favorites: Movie[];
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({} as FavoritesContextType);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Movie[]>(() => {
        try {
            const saved = localStorage.getItem("favorites");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });


    useEffect(() => {
        try {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch {
            console.error("Erro ao salvar favoritos no localStorage");
        }
    }, [favorites]);


    function toggleFavorite(movie: Movie) {
        setFavorites((prev) =>
            prev.some((f) => f.id === movie.id)
                ? prev.filter((f) => f.id !== movie.id)
                : [...prev, movie]
        );
    }

    function isFavorite(id: number) {
        return favorites.some((f) => f.id === id);
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
