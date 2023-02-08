import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./detail-page.module.scss";
import { BannerModel } from "@/models/banner.models";
import { useEffect, useState } from "react";
import { ApiService } from "@/service/api-service";
import { MainLayoutComponent } from "@/layout/main";
import { ProductModel } from "@/models/product.models";
import ProductComponent from "@/components/products";
import BannerComponent from "@/components/banner";

DetailPage.Layout = MainLayoutComponent;

export default function DetailPage() {
  const router = useRouter();
  const { productID } = router.query;
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [bannerList, setBannerList] = useState<BannerModel[]>([]);
  useEffect(() => {
    const getBannerList = async () => {
      try {
        const { data } = await ApiService.getBanners(1, 10);
        const convertData: BannerModel[] = data.docs.map((el: any) => {
          return {
            ...el,
            id: el._id,
          };
        });
        setBannerList(convertData);
      } catch (error) {
        console.error(error);
      }
    };

    getBannerList();
  }, []);

  useEffect(() => {
    if (!productID) return;
    const getProductDetail = async () => {
      try {
        const { data } = await ApiService.getProductDetail(productID as string);
        const product: ProductModel = {
          ...data,
          id: data._id,
          category: data.category.map((e: any) => {
            return {
              ...e,
              id: e._id
            }
          })
        };
        
        setProduct(product);
        getProductList(product.category[0]?.id);
      } catch (error) {
        console.error(error);
      }
    };

    const getProductList = async (categoryID: string) => {
      if (!categoryID) return;
      try {
        const { data } = await ApiService.getProductsByCategoryID(
          categoryID,
          1,
          10
        );
        const productList: ProductModel[] = data.docs.map((el: any) => {
          return {
            ...el,
            id: el._id,
            tags: el.tag
          };
        });
        setProductList(productList);
      } catch (error) {
        console.error(error);
      }
    };

    getProductDetail();

    return () => {
      console.log('clean up');
    }
  }, [productID]);

  return (
    <>
      <Head>
        <title>{productID}</title>
        <meta name="description" content="Title for detail page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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

        <BannerComponent bannerList={bannerList} />
        <ProductComponent productList={productList} />
      </div>
    </>
  );
}
