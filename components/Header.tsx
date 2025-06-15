import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Referências para detectar clique fora
  const menuRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleTheme = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (typeof window !== 'undefined') {
        if (newMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }
      return newMode;
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else if (savedTheme === 'light') {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, []);

  const handleLanguageChange = (language: 'pt' | 'en') => {
    setLang(language);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            Mas Deus
          </Link>
          {/* Linguagem comentada por enquanto
          <div className={styles.languageSelector}>
            <button
              onClick={() => handleLanguageChange('pt')}
              className={lang === 'pt' ? styles.activeLang : ''}
              aria-label="Selecionar idioma português"
            >
              🇧🇷
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={lang === 'en' ? styles.activeLang : ''}
              aria-label="Selecionar idioma inglês"
            >
              🇺🇸
            </button>
          </div>
          */}
        </div>

        <div className={styles.right}>
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className={styles.hamburger}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>

          <nav
            ref={menuRef}
            className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          >
            <Link href="/" onClick={closeMenu}>Inicio</Link>
            <Link href="/artigos" onClick={closeMenu}>Artigos</Link>
            {/*<Link href="/categorias" onClick={closeMenu}>Categorias</Link>*/}
            <Link href="/sobre" onClick={closeMenu}>Sobre</Link>
            <Link href="/contato" onClick={closeMenu}>Contato</Link>
          </nav>

          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Alternar para tema ${darkMode ? 'claro' : 'escuro'}`}
            title={`Alternar para tema ${darkMode ? 'claro' : 'escuro'}`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
