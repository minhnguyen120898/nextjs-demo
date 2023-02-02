
import { MainLayoutComponent } from "@/layout/main";
import BannerComponent from "@/components/banner";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Slider from "react-slick";
import styles from "../styles/DetailPage.module.scss";

export interface DetailPageProps {}
DetailPage.Layout = MainLayoutComponent;

export default function DetailPage(props: DetailPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const recommentList = [
    { id: 1, title: 'title', tags: ['#123'], image: '/image/img_facility1.png' },
    { id: 2, title: 'title', tags: ['#123'], image: '/image/img_facility2.png' },
    { id: 3, title: 'title', tags: ['#123'], image: '/image/img_facility3.png' },
    { id: 4, title: 'title', tags: ['#123'], image: '/image/img_facility1.png' },
    { id: 5, title: 'title', tags: ['#123'], image: '/image/img_facility2.png' },
    { id: 6, title: 'title', tags: ['#123'], image: '/image/img_facility3.png' },
    { id: 7, title: 'title', tags: ['#123'], image: '/image/img_facility1.png' },
    { id: 8, title: 'title', tags: ['#123'], image: '/image/img_facility2.png' },
    { id: 9, title: 'title', tags: ['#123'], image: '/image/img_facility3.png' },
  ];

  const settingsNextCategory = {
    dots: false,
    infinite: false,
    slidesToShow: Math.min(recommentList.length, 4),
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: Math.min(recommentList.length, 3),
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{id}</title>
        <meta name="description" content="Title for detail page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta
          property="og:title"
          content="Starter is a safest, trust, multi-chain launchpad. Boosting high-quality projects reach successful fundraising."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/302430261_522613886532675_1589346098537115887_n.png?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jVnVhWQ3GMIAX-4IhTW&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCtL0gaVCEJCrWEc5WdV7kCF9HjY0FMj5kJwMBjWDFg0A&oe=63C4F2DF"
        />
        <meta property="og:url" content="https://x-starter.org" />
        <meta
          property="og:description"
          content="Starter will be a cutting-edge launchpad and a multi-chain fundraising platform helping projects raise capital and bringing safe investment opportunities to early investors in GameFi, NFT and Metaverse."
        />
      </Head>
      <div>
        <section id={styles.banner}></section>
        <div className={styles["field-top"]}>
          <div className={styles["inner-field"]}>
            <h3>
              <small>めいふつ</small>
              <span>天むすの千寿</span>
            </h3>
            <div className={styles.social}>
              <div className={styles.left}>
                <span>#春</span>
                <span>#晴れ</span>
              </div>
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
              </div>
            </div>
            <div className={styles["collection-video"]}>
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

        <div className={styles.field}>
          <div className={styles["inner-field"]}>
            <h3>
              <span>施設写真</span>
            </h3>
            <div className={styles["collection-image"]}>
              <div>
                <img src="/image/img_facility1.png" alt="" />
              </div>
              <div>
                <img src="/image/img_facility2.png" alt="" />
              </div>
              <div>
                <img src="/image/img_facility3.png" alt="" />
              </div>
              <div>
                <img src="/image/img_facility1.png" alt="" />
              </div>
              <div>
                <img src="/image/img_facility2.png" alt="" />
              </div>
              <div>
                <img src="/image/img_facility3.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles["inner-field"]}>
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

        <div className={styles.field}>
          <div className={styles["inner-field"]}>
            <h3>
              <span>詳細情報</span>
            </h3>
            <table>
              <tbody>
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
              </tbody>
            </table>
          </div>
        </div>

        <BannerComponent></BannerComponent>

        <div className={styles.building + " building"}>
          <div className={styles.building_top}>
            <img src="/image/img_facility3.png" alt="" />
            <h3>おすすめ</h3>
            <Link href="/">すべて見る</Link>
          </div>
          <div className={styles.content}>
            <Slider
              className={styles["slick-slider2"] + " " + "slider-slider2"}
              {...settingsNextCategory}
            >
              {
                recommentList.map((item, index) => {
                  return (
                    <div className={styles.element} key={item.id}>
                      <img src={item.image} className={styles['element-image']} alt="" />
                      <div className={styles["content-element"]}>
                        <div>
                          {
                            item.tags.map((tag, j) => {
                              return (
                                <label key={tag + j}>{tag}</label>
                              )
                            })
                          }
                        </div>
                        <span>{item.title}</span>
                      </div>
                    </div>
                  )
                })
              }
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
