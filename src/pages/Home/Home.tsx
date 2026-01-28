import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies, searchMovies } from "../../services/api";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Button } from "../../components/Button/Button";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import styles from "./Home.module.css";
import { Icon } from "../../components/Icon/Icon";
import ArrowLeft from "../../assets/icons/arrow-left.svg?react";
import ArrowRight from "../../assets/icons/arrow-right.svg?react";

export function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["movies", search, page],
        queryFn: () =>
            search ? searchMovies(search, page) : getPopularMovies(page),
    });

    function handleSearch(query: string) {
        setSearchParams(query ? { search: query, page: "1" } : { page: "1" });
    }

    function handlePageChange(newPage: number) {
        const params: Record<string, string> = { page: String(newPage) };
        if (search) params.search = search;
        setSearchParams(params);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                {search ? `Resultados para "${search}"` : "Filmes Populares"}
            </h1>
            <SearchBar onSearch={handleSearch} initialValue={search} />

            {isLoading && (
                <div className={styles.grid}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Skeleton height="300px" borderRadius="8px" />
                            <Skeleton height="20px" width="80%" />
                            <Skeleton height="16px" width="40%" />
                        </div>
                    ))}
                </div>
            )}

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
                        <Icon svg={ArrowLeft} width={28} height={28} />
                    </Button>
                    <span>Página {page} de {data.total_pages}</span>
                    <Button
                        disabled={page >= data.total_pages}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        <Icon svg={ArrowRight} width={28} height={28} />
                    </Button>

                </div>
            )}
        </div>
    );
}
