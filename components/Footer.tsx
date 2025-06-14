// components/Footer.tsx
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Meu Blog Teológico. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
