import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import styles from "./header.module.scss";

export interface HeaderComponentProps {}

export default function HeaderComponent(props: HeaderComponentProps) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearchBox, setSearchBox] = useState(false);
  const [background, setBackground] = useState(false);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const domain = process.env.domain;

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

  function handleSearch() {
    let valueSearch = inputSearchRef.current?.value;
    if (openSearchBox && valueSearch) {
      inputSearchRef.current?.blur();
      router.push({
        pathname: `${domain}/search`,
        query: { search: valueSearch }
      })
    } else {
      setSearchBox(!openSearchBox);
    }
  }

  function onKeydown(event: any) {
    let valueSearch = inputSearchRef.current?.value;
    if (event.keyCode === 13 && valueSearch) {
      router.push({
        pathname: `${domain}/search`,
        query: { search: valueSearch }
      })
    }
  }

  return (
    <header
      className={styles.header + " " + (background ? styles["bg-white"] : "")}
    >
      <div className={styles["header-content"]}>
        <div className={styles.left}>
          <a id={styles.logo} href={domain}>
            <Image
              src={"/image/logo_wht@3x.svg"}
              alt=""
              fill
              className={styles.image}
            />
          </a>
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
                onKeyDown={(event) => onKeydown(event)}
              />
              <button
                className={styles.icon + " " + styles["search-btn"]}
                onClick={() => handleSearch()}
              >
                <p className={styles["container-image"]}>
                  <Image
                    src={"/image/icons/ic_search-w.svg"}
                    alt=""
                    fill
                    className={styles.image}
                  />
                </p>
              </button>
            </li>
            <li>
              <div className={styles.toggle}>
                <div
                  className={
                    styles["toggle-button"] + " " + (openMenu ? styles.on : "")
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
      <div className={styles["side-nav"] + " " + (openMenu ? styles.open : "")}>
        <div
          className={styles["close-side-nav"]}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <Image
            src={"/image/icons/ic_close.svg"}
            alt="close-side-nav"
            fill
            className={styles.image}
          />
        </div>
        <h2 className={styles["side-nav__title"]}>Menu</h2>
        <p className={styles["side-nav__desc"]}>メニュー</p>
        <ul className={styles["side-nav__list"]}>
          <li className={styles.item}>
            <Link href="/" data-text="マイページ">
              マイページ
            </Link>
          </li>
          <li className={styles.item}>
            <Link href={`${domain}/course/create`} data-text="モデルコース">
              モデルコース
            </Link>
          </li>
          <li className={styles.item}>
            <Link href={`${domain}/course/create`} data-text="Aiコンシェルジュ">
              Aiコンシェルジュ
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/" data-text="広告について">
              広告について
            </Link>
          </li>
        </ul>
      </div>
      { openMenu && <div className={styles.modal} id="modal" onClick={() => setOpenMenu(!openMenu)}></div>}
    </header>
  );
}
