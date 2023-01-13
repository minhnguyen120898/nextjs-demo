import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "../../../styles/DetailPage.module.css";

export interface DetailPageProps {}

export default function DetailPage(props: DetailPageProps) {

  const router = useRouter();
  const { id } = router.query

  function toogleMenu() {
    let menuButton = document.getElementById("toggle-button");
    let sidenav = document.getElementById("side-nav");
    menuButton?.classList.toggle("on");
    sidenav?.classList.toggle("open");
  }

  function showSearch() {
    let searchEle = document.getElementById("search-text-header");
    let searchBox = document.getElementById("search-box");
    searchBox?.classList.toggle("active");
    if (searchBox?.classList.contains("active")) {
      searchEle?.focus();
    } else {
      searchEle?.blur();
    }
  }

  return (
    <>
      <Head>
        <title>{id}</title>
        <meta name="description" content="Title for detail page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="Starter is a safest, trust, multi-chain launchpad. Boosting high-quality projects reach successful fundraising." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/302430261_522613886532675_1589346098537115887_n.png?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jVnVhWQ3GMIAX-4IhTW&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCtL0gaVCEJCrWEc5WdV7kCF9HjY0FMj5kJwMBjWDFg0A&oe=63C4F2DF" />
        <meta property="og:url" content="https://x-starter.org" />
        <meta property="og:description" content="Starter will be a cutting-edge launchpad and a multi-chain fundraising platform helping projects raise capital and bringing safe investment opportunities to early investors in GameFi, NFT and Metaverse." />
      </Head>
      <div>
        <header id={styles.header}>
          <div id="header-content">
            <div id="left">
              <Link id="logo" href="/">
                <Image src="./image/logo_wht@3x.svg" alt="" />
              </Link>
            </div>
            <div id="right">
              <ul>
                <li className="search-box" id="search-box">
                  <input
                    id="search-text-header"
                    type="text"
                    className="search-text"
                    placeholder="Type to search..."
                  />
                  <button className="icon search-btn" onClick={showSearch}>
                    <Image src="./image/icons/ic_search-w.svg" alt="search" />
                  </button>
                </li>
                <li>
                  <div className="toggle">
                    <div
                      className="toggle-button"
                      id="toggle-button"
                      onClick={toogleMenu}
                    >
                      <span></span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="side-nav" id="side-nav">
            <div className="close-side-nav" onClick={toogleMenu}>
              <Image src="./image/icons/ic_close.svg" alt="close-side-nav" />
            </div>
            <h2 className="side-nav__title">Menu</h2>
            <p className="side-nav__desc">メニュー</p>
            <ul className="side-nav__list">
              <li className="item">
                <Link href="" data-text="item1">
                  item1
                </Link>
              </li>
              <li className="item">
                <Link href="" data-text="item2">
                  item2
                </Link>
              </li>
              <li className="item">
                <Link href="" data-text="item3">
                  item3
                </Link>
              </li>
              <li className="item">
                <Link href="" data-text="item4">
                  item4
                </Link>
              </li>
            </ul>
          </div>
        </header>

        <section id="banner"></section>

        <div className="field-top">
          <div className="inner-field">
            <h3>
              <small>めいふつ</small>
              <span>天むすの千寿</span>
            </h3>
            <div className="social">
              <div className="left">
                <span>#春</span>
                <span>#晴れ</span>
              </div>
              <div className="right">
                <ul>
                  <li>
                    <Link href="">
                      <Image src="./image/instagram.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <Image src="./image/tw.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <Image src="./image/fb.png" alt="" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="collection-video">
              <video controls>
                <source
                  src="https://www.youtube.com/watch?v=tk31vD3AhHA&ab_channel=MINHHI%E1%BA%BEUAG"
                  type="video/mp4"
                />
                <source
                  src="https://www.youtube.com/watch?v=tk31vD3AhHA&ab_channel=MINHHI%E1%BA%BEUAG"
                  type="video/ogg"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="inner-field">
            <h3>
              <span>施設写真</span>
            </h3>
            <div className="collection-image">
              <div>
                <Image src="./image/img_facility1.png" alt="" />
              </div>
              <div>
                <Image src="./image/img_facility2.png" alt="" />
              </div>
              <div>
                <Image src="./image/img_facility3.png" alt="" />
              </div>
              <div>
                <Image src="./image/img_facility1.png" alt="" />
              </div>
              <div>
                <Image src="./image/img_facility2.png" alt="" />
              </div>
              <div>
                <Image src="./image/img_facility3.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="inner-field">
            <h3>
              <span>施設紹介</span>
            </h3>
            <p>
              千寿は天むす発祥のお店です。現在では「天むす」という名前は全国に知れ渡っておりますが、初代の水谷ヨネが夫の為に栄養のあるものを―という愛情から天むすは生まれました。
              <br />
              <br />
              それから絶え間ない試行錯誤の上、今でも皆様に愛される昔懐かしい味として親しまれております。
              <br />
              <br />
              是非、一度、千寿の「めいふつ天むす」の天むすをご賞味くださいませ。皆様のご来店を心よりお待ちしております。
              <br />
            </p>
          </div>
        </div>

        <div className="field">
          <div className="inner-field">
            <h3>
              <span>詳細情報</span>
            </h3>
            <table>
              <tr>
                <td>
                  <label>場所</label>
                  <span>三重県津市大門９−７</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>電話番号</label>
                  <span>059-228-6798</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>利用時間</label>
                  <span>
                    9:30～17:30 (但し、ご注文は17：00までの承りとなります)
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>休日</label>
                  <span>毎週日曜日、第3月曜日</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>利用料金</label>
                  <span>1000円〜</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>駐車場</label>
                  <span>5台あり</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>決済情報</label>
                  <span>VISA、MASTER、AMEX、JCB、PAYPAY</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>備考</label>
                  <span>-</span>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="slider-banner">
          <div className="slick-slider">
            <div className="item">
              <Image
                src="./image/img_facility1.png"
                className="item_image"
                alt=""
              />
            </div>
            <div className="item">
              <Image
                src="./image/img_facility1.png"
                className="item_image"
                alt=""
              />
            </div>
            <div className="item">
              <Image
                src="./image/img_facility1.png"
                className="item_image"
                alt=""
              />
            </div>
            <div className="item">
              <Image
                src="./image/img_facility1.png"
                className="item_image"
                alt=""
              />
            </div>
          </div>
          <button type="button" className="slick-prev1">
            &lsaquo;
          </button>
          <button type="button" className="slick-next1">
            &rsaquo;
          </button>
        </div>

        <div className="building">
          <div className="building_top">
            <Image src="./image/img_facility3.png" alt="" />
            <h3>おすすめ</h3>
            <Link href="">すべて見る</Link>
          </div>
          <div className="content">
            <section className="slick-slider2">
              <div className="element">
                <Image
                  src="./image/img_facility1.png"
                  className="element-image"
                  alt=""
                />
                <div className="content-element">
                  <div>
                    <label> #123 </label>
                  </div>
                  <span>#123 </span>
                </div>
              </div>
              <div className="element">
                <Image
                  src="./image/img_facility2.png"
                  className="element-image"
                  alt=""
                />
                <div className="content-element">
                  <div>
                    <label> #123 </label>
                  </div>
                  <span>#123 </span>
                </div>
              </div>
              <div className="element">
                <Image
                  src="./image/img_facility3.png"
                  className="element-image"
                  alt=""
                />
                <div className="content-element">
                  <div>
                    <label> #123 </label>
                  </div>
                  <span>#123 </span>
                </div>
              </div>
              <div className="element">
                <Image
                  src="./image/img_facility1.png"
                  className="element-image"
                  alt=""
                />
                <div className="content-element">
                  <div>
                    <label> #123 </label>
                  </div>
                  <span>#123 </span>
                </div>
              </div>
              <div className="element">
                <Image
                  src="./image/img_facility2.png"
                  className="element-image"
                  alt=""
                />
                <div className="content-element">
                  <div>
                    <label> #123 </label>
                  </div>
                  <span>#123 </span>
                </div>
              </div>
              <div className="element">
                <Image
                  src="./image/img_facility3.png"
                  className="element-image"
                  alt=""
                />
                <div className="content-element">
                  <div>
                    <label> #123 </label>
                  </div>
                  <span>#123 </span>
                </div>
              </div>
              <div className="element">
                <Image
                  src="./image/img_facility1.png"
                  className="element-image"
                  alt=""
                />
                <div className="content-element">
                  <div>
                    <label> #123 </label>
                  </div>
                  <span>#123 </span>
                </div>
              </div>
            </section>
            <button type="button" className="slick-prev2">
              &lsaquo;
            </button>
            <button type="button" className="slick-next2">
              &rsaquo;
            </button>
          </div>
        </div>

        <footer className="footer">
          <div id="inner-footer">
            <ul className="left">
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
            <div className="right">
              <ul>
                <li>
                  <Link href="">
                    <Image src="./image/instagram.png" alt="" />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <Image src="./image/tw.png" alt="" />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <Image src="./image/fb.png" alt="" />
                  </Link>
                </li>
              </ul>

              <Link id="logo" href="/">
                <Image src="./image/logo_wht@3x.svg" alt="" />
              </Link>
            </div>
          </div>
          <p id="copired">copired</p>
        </footer>
      </div>
    </>
  );
}
