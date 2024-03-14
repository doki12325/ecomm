import styles from "@styles/mobnav.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function MobileNav(props) {
  const pathName = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 0);
  }, []);
  return (
    <div className={styles.main}>
      <div
        className={styles.container}
        style={{ translate: show ? "0" : "-100%" }}
      >
        <button
          className={styles.closeButton}
          onClick={(e) => {
            e.preventDefault();
            setShow(false);
            setTimeout(() => {
              props.setShowMobileNav(false);
            }, 300);
          }}
        >
          <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <div className={styles.linkContainer}>
          <Link
            href="/collections"
            className={`${styles["navLink"]} ${
              pathName === "/collections" ? styles["active"] : ""
            }`}
          >
            Collections
          </Link>
          <Link
            href="/men"
            className={`${styles["navLink"]} ${
              pathName === "/men" ? styles["active"] : ""
            }`}
          >
            Men
          </Link>
          <Link
            href="/women"
            className={`${styles["navLink"]} ${
              pathName === "/women" ? styles["active"] : ""
            }`}
          >
            Women
          </Link>
          <Link
            href="/about"
            className={`${styles["navLink"]} ${
              pathName === "/about" ? styles["active"] : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${styles["navLink"]} ${
              pathName === "/contact" ? styles["active"] : ""
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
