import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import styles from "./footer.module.scss";

export interface FooterComponentProps {}

export default function FooterComponent(props: FooterComponentProps) {
  const domain = process.env.domain;
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles["inner-footer"]}>
          <ul className={styles.left}>
            <li>
              <Link href={`${domain}/site-map`}>サイトマップ</Link>
            </li>
            <li>
              <Link href={`${domain}/privacy`}>プライバシーポリシー</Link>
            </li>
            <li>
              <Link href={`${domain}/policy`}>個人情報保護方針</Link>
            </li>
            <li>
              <Link href={`${domain}/company`}>運営会社情報</Link>
            </li>
            <li>
              <Link href={`${domain}/`}>広告掲載について</Link>
            </li>
            <li>
              <Link href={`${domain}/`}>会員利用規約</Link>
            </li>
            <li>
              <Link href={`${domain}/`}>メールマガジンについて</Link>
            </li>
            {/* <li>
              <Link href={`${domain}/`}>退会について</Link>
            </li> */}
            <li>
              <Link href={`${domain}/contact`}>お問い合わせ</Link>
            </li>
          </ul>
          <div className={styles.right}>
            <ul>
              <li>
                <Link href={`${domain}/`}>
                  <Image
                    src={"/image/instagram.png"}
                    alt=""
                    fill
                    className={styles.image}
                  />
                </Link>
              </li>
              <li>
                <Link href={`${domain}/`}>
                  <Image
                    src={"/image/tw.png"}
                    alt=""
                    fill
                    className={styles.image}
                  />
                </Link>
              </li>
              <li>
                <Link href={`${domain}/`}>
                  <Image
                    src={"/image/fb.png"}
                    alt=""
                    fill
                    className={styles.image}
                  />
                </Link>
              </li>
            </ul>

            <Link id={styles.logo} href="/">
              <Image
              src={"/image/logo_wht@3x.svg"}
              alt=""
              fill
              className={styles.image}
            />
            </Link>
          </div>
        </div>
        <p id={styles.copired}>copired</p>
      </footer>
    </>
  );
}
