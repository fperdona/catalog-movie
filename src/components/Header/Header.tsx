import { Link } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import styles from "./Header.module.css";
import Logo from "../../assets/icons/logo.svg?react";
import ListHeart from "../../assets/icons/list-heart.svg?react";
import MoonStars from "../../assets/icons/moon-stars.svg?react";
import SunDim from "../../assets/icons/sun-dim.svg?react";

interface HeaderProps {
    theme: "dark" | "light";
    onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo} aria-label="Ir para página inicial">
                <Icon svg={Logo} width={28} height={28} />
            </Link>
            <Link to="/favoritos" className={styles.link} aria-label="Ver favoritos">
                <Icon svg={ListHeart} width={28} height={28} />
            </Link>
            <button
                className={styles.theme}
                onClick={onToggleTheme}
                aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            >
                <Icon svg={theme === "dark" ? SunDim : MoonStars} width={28} height={28} />
            </button>
        </header>
    );
}
