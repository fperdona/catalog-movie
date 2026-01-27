import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies, searchMovies } from "../../services/api";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import styles from "./Home.module.css";

export function Home() {
    const [search, setSearch] = useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["movies", search],
        queryFn: () =>
            search ? searchMovies(search) : getPopularMovies(),
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                {search ? `Resultados para "${search}"` : "Filmes Populares"}
            </h1>
            <SearchBar onSearch={setSearch} />

            {isLoading && <p className={styles.message}>Carregando...</p>}
            {isError && <p className={styles.message}>Erro ao carregar filmes.</p>}

            <div className={styles.grid}>
                {data?.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
