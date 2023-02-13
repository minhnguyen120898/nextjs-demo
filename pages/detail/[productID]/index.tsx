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
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import LoadingComponent from "@/core/loading";
import { ImageModal } from "@/components/dialog";

DetailPage.Layout = MainLayoutComponent;
export interface DetailPageProps {
  product: ProductModel
}

export default function DetailPage({ product } : DetailPageProps) {
  const router = useRouter();

  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [bannerList, setBannerList] = useState<BannerModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

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
    if (!product) return;
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
            tags: el.tag,
          };
        });
        setProductList(productList);
      } catch (error) {
        console.error(error);
      }
    };

    getProductList(product.category[0]?.id);
    return () => {
      console.log("clean up");
    };
  }, []);

  const handleImageModal = (imageSrc?: string) => {
    setImageSrc(imageSrc || "");
    setShowModal(!showModal);
  };

  if (router.isFallback) {
    return <LoadingComponent />
  }

  return (
    <>
      <Head>
        <title>{'MIE | ' + product?.meta_title}</title>
        <meta name="description" content={product?.meta_description} />
        <meta name="keywords" content="mie" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={product?.eye_catching} />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:title" content={'MIE | ' + product?.meta_title} />
        <meta property="og:description" content={product?.meta_description} />
        <meta property="og:image" content={product?.eye_catching}/>
        <meta property="og:url" content={process.env.domain} />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="600" />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content={product?.eye_catching} />
        <meta name="twitter:title" content={'MIE | ' + product?.meta_title} />
        <meta name="twitter:description" content={product?.meta_description} />
        <meta name="twitter:image" content={product?.eye_catching} />
        <meta name="twitter:url" content={process.env.domain} />
      </Head>
      <div>
        <section
          id={styles.banner}
          style={{ backgroundImage: "url(" + product?.eye_catching + ")" }}
        ></section>
        <div className={styles["field-top"]}>
          <div className={styles["inner-field"]}>
            <h3>
              <small>めいふつ</small>
              <span>{product?.title}</span>
            </h3>
            <div className={styles.social}>
              <div className={styles.left}>
                {product?.tags &&
                  product?.tags.map((tag) => {
                    return <span key={tag.id}>#{tag.title}</span>;
                  })}
              </div>
              <div className={styles.right}>
                <ul>
                  {product?.social?.facebook && (
                    <li>
                      <Link href={product?.social.facebook} target="_blank">
                        <Image
                          className={styles.image}
                          src={"/image/fb.png"}
                          alt=""
                          fill
                        />
                      </Link>
                    </li>
                  )}
                  {product?.social?.instagram && (
                    <li>
                      <Link href={product?.social.instagram} target="_blank">
                        <Image
                          className={styles.image}
                          src={"/image/instagram.png"}
                          alt=""
                          fill
                        />
                      </Link>
                    </li>
                  )}
                  {product?.social?.twitter && (
                    <li>
                      <Link href={product?.social.twitter} target="_blank">
                        <Image
                          className={styles.image}
                          src={"/image/tw.png"}
                          alt=""
                          fill
                        />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className={styles["collection-video"]}>
              {product?.video?.includes("https://www.youtube.com/embed/") ? (
                <iframe
                  src={product?.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video src={product?.video} controls></video>
              )}
            </div>
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles["inner-field"]}>
            <h3>
              <span>施設写真</span>
            </h3>
            {product?.image && product.image.length > 1 && (
              <div className={styles["collection-image"]}>
                {product?.image.map((e, index) => {
                  return (
                    <div key={e + index} onClick={() => {
                      handleImageModal(e)
                    }}>
                      <img src={e} alt={e} />
                    </div>
                  );
                })}
              </div>
              )
            }
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles["inner-field"]}>
            <h3>
              <span>施設紹介</span>
            </h3>
            <p
              dangerouslySetInnerHTML={{ __html: product?.description || "-" }}
            ></p>
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
                    <span>{product?.address || "-"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>電話番号</label>
                    <span>{product?.phone || "-"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>利用時間</label>
                    <span>{product?.utilization_time || "-"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>休日</label>
                    <span>{product?.holiday || "-"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>利用料金</label>
                    <span>{product?.fee || "-"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>駐車場</label>
                    <span>{product?.parking || "-"}</span>
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
                    <span>{product?.remark || "-"}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <BannerComponent bannerList={bannerList} />
        <ProductComponent
          productList={productList}
          categoryID={product?.category[0]?.id}
        />

        {showModal && (
          <ImageModal imageSrc={imageSrc} handleImageModal={handleImageModal} />
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await ApiService.getProducts(1, 10);
  return {
    paths: data.docs.map((product: any) => ({ params : { productID: product._id }})),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<DetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  const productID = context.params?.productID;
  if (!productID) return { notFound: true };

  const { data } = await ApiService.getProductDetail(productID as string);
  const product: ProductModel = {
    ...data,
    id: data._id,
    tags: data.tag.map((e: any) => {
      return {
        ...e,
        id: e._id,
      };
    }),
    category: data.category.map((e: any) => {
      return {
        ...e,
        id: e._id,
      };
    }),
  }

  return {
    // will be passed to the page component as props
    props: {
      product: product
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10 // In seconds
  }
}