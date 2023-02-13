import Image from "next/image";
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
              <Link href="/abc">サイトマップ</Link>
            </li>
            <li>
              <Link href="/abc">プライバシーポリシー</Link>
            </li>
            <li>
              <Link href="/abc">個人情報保護方針</Link>
            </li>
            <li>
              <Link href="/abc">運営会社情報</Link>
            </li>
            <li>
              <Link href="/abc">広告掲載について</Link>
            </li>
            <li>
              <Link href="/abc">会員利用規約</Link>
            </li>
            <li>
              <Link href="/abc">メールマガジンについて</Link>
            </li>
            {/* <li>
              <Link href="/abc">退会について</Link>
            </li> */}
            <li>
              <Link href="/abc">お問い合わせ</Link>
            </li>
          </ul>
          <div className={styles.right}>
            <ul>
              <li>
                <Link href="/abc">
                  <Image
                    src={"/image/instagram.png"}
                    alt=""
                    fill
                    className={styles.image}
                  />
                </Link>
              </li>
              <li>
                <Link href="/abc">
                  <Image
                    src={"/image/tw.png"}
                    alt=""
                    fill
                    className={styles.image}
                  />
                </Link>
              </li>
              <li>
                <Link href="/abc">
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
