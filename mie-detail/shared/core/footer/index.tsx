import Link from "next/link";
import * as React from "react";
import styles from "./footer.module.scss";

export interface FooterComponentProps {}

export default function FooterComponent(props: FooterComponentProps) {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles["inner-footer"]}>
          <ul className={styles.left}>
            <li>
              <Link href="">サイトマップ</Link>
            </li>
            <li>
              <Link href="">プライバシーポリシー</Link>
            </li>
            <li>
              <Link href="">個人情報保護方針</Link>
            </li>
            <li>
              <Link href="">運営会社情報</Link>
            </li>
            <li>
              <Link href="">広告掲載について</Link>
            </li>
            <li>
              <Link href="">会員利用規約</Link>
            </li>
            <li>
              <Link href="">メールマガジンについて</Link>
            </li>
            <li>
              <Link href="">退会について</Link>
            </li>
            <li>
              <Link href="">お問い合わせ</Link>
            </li>
          </ul>
          <div className={styles.right}>
            <ul>
              <li>
                <Link href="">
                  <img src="/image/instagram.png" alt="" />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img src="/image/tw.png" alt="" />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img src="/image/fb.png" alt="" />
                </Link>
              </li>
            </ul>

            <Link id={styles.logo} href="/">
              <img src="/image/logo_wht@3x.svg" alt="" />
            </Link>
          </div>
        </div>
        <p id={styles.copired}>copired</p>
      </footer>
    </>
  );
}
