import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies, searchMovies } from "../../services/api";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Button } from "../../components/Button/Button";
import styles from "./Home.module.css";

export function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");

    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["movies", search, page],
        queryFn: () =>
            search ? searchMovies(search, page) : getPopularMovies(page),
    });

    function handleSearch(query: string) {
        setSearch(query);
        setSearchParams({ page: "1" });
    }

    function handlePageChange(newPage: number) {
        setSearchParams({ page: String(newPage) });
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                {search ? `Resultados para "${search}"` : "Filmes Populares"}
            </h1>
            <SearchBar onSearch={handleSearch} />

            {isLoading && <p className={styles.message}>Carregando...</p>}
            {isError && <p className={styles.message}>Erro ao carregar filmes.</p>}

            <div className={styles.grid}>
                {data?.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {data && (
                <div className={styles.pagination}>
                    <Button
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        ← Anterior
                    </Button>
                    <span>Página {page} de {data.total_pages}</span>
                    <Button
                        disabled={page >= data.total_pages}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Próxima →
                    </Button>
                </div>
            )}
        </div>
    );
}
