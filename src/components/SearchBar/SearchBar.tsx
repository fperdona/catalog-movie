import { useState } from "react";
import styles from "./SearchBar.module.css";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import Search from "../../assets/icons/search.svg?react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialValue?: string;
}

export function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSearch(query.trim());
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                placeholder="Buscar filmes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.input}
            />
            <Button type="submit">
                <Icon svg={Search} width={28} height={28} />
            </Button>
        </form>
    );
}
