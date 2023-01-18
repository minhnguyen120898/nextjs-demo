
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import styles from "./header.module.scss";

export interface HeaderComponentProps {
}

export default function HeaderComponent (props: HeaderComponentProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearchBox, setSearchBox] = useState(false);
  const [background, setBackground] = useState(false);
  const inputSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openSearchBox) {
      inputSearchRef.current?.focus();
    } else {
      inputSearchRef.current?.blur();
    }
  }, [openSearchBox]);

  useEffect(() => {
    const onScroll = () => {
      let number = document.scrollingElement?.scrollTop || 0;
      if (number > 109 && !background) {
        setBackground(true);
      }
      if (number <= 109 && background) {
        setBackground(false);
      }
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [background]);

  return (
    <header
    className={
      styles.header + " " + (background ? styles["bg-white"] : "")
    }
  >
    <div className={styles["header-content"]}>
      <div className={styles.left}>
        <Link id={styles.logo} href="/">
          <img src="/image/logo_wht@3x.svg" alt="" />
        </Link>
      </div>
      <div className={styles.right}>
        <ul>
          <li
            className={
              styles["search-box"] +
              " " +
              (openSearchBox ? styles.active : "")
            }
          >
            <input
              type="text"
              className={styles["search-text"]}
              placeholder="Type to search..."
              ref={inputSearchRef}
            />
            <button
              className={styles.icon + " " + styles["search-btn"]}
              onClick={() => setSearchBox(!openSearchBox)}
            >
              <img src="/image/icons/ic_search-w.svg" alt="" />
            </button>
          </li>
          <li>
            <div className={styles.toggle}>
              <div
                className={
                  styles["toggle-button"] +
                  " " +
                  (openMenu ? styles.on : "")
                }
                onClick={() => setOpenMenu(!openMenu)}
              >
                <span></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      className={styles["side-nav"] + " " + (openMenu ? styles.open : "")}
    >
      <div
        className={styles["close-side-nav"]}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <img src="/image/icons/ic_close.svg" alt="close-side-nav" />
      </div>
      <h2 className={styles["side-nav__title"]}>Menu</h2>
      <p className={styles["side-nav__desc"]}>メニュー</p>
      <ul className={styles["side-nav__list"]}>
        <li className={styles.item}>
          <Link href="" data-text="item1">
            item1
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="" data-text="item2">
            item2
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="" data-text="item3">
            item3
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="" data-text="item4">
            item4
          </Link>
        </li>
      </ul>
    </div>
  </header>
  );
}
