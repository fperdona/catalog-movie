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
            <Link to="/" className={styles.logo}>
                <Icon svg={Logo} width={28} height={28} />
            </Link>
            <Link to="/favoritos" className={styles.link}>
                <Icon svg={ListHeart} width={28} height={28} />
            </Link>
            <Icon svg={theme === "dark" ? SunDim : MoonStars} className={styles.theme} width={28} height={28} onClick={onToggleTheme} />

        </header>
    );
}
