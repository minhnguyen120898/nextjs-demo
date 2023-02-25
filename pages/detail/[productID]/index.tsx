import Link from "next/link";
import styles from "./detail-page.module.scss";
import { BannerModel } from "@/models/banner.models";
import { useEffect, useState } from "react";
import { ApiService } from "@/service/api-service";
import { MainLayoutComponent } from "@/layout/main";
import { CategoryModel, ProductModel } from "@/models/product.models";

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ImageModal } from "@/core/dialog";
import { SeoComponent } from "@/core/seo";
import BannerComponent from "components/banner";
import ProductComponent from "components/products";

DetailPage.Layout = MainLayoutComponent;
export interface DetailPageProps {
  product: ProductModel;
}

export default function DetailPage({ product }: DetailPageProps) {
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [bannerList, setBannerList] = useState<BannerModel[]>([]);
  const [categoryParentTitle, setCategoryParentTitle] = useState<CategoryModel>();
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const getBannerList = async () => {
      try {
        const data = await ApiService.getBanners(1, 10);
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
        const data = await ApiService.getProductsByCategoryID(
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

  useEffect(() => {
    if (!product) return;
    const getCategoryParent = async (categoryID?: string) => {
      if (!categoryID) return;
      try {
        const data = await await ApiService.getCategoryDetail(categoryID);
        setCategoryParentTitle({
          ...data,
          id: data._id
        });
      } catch (error) {
        console.error(error);
      }
    };

    getCategoryParent(product.category[0]?.parent?.[0]);
  }, []);

  const handleImageModal = (imageSrc?: string) => {
    setImageSrc(imageSrc || "");
    setShowModal(!showModal);
  };

  const handleDownload = () => {
    if (product?.video) {
      const body = document.getElementsByTagName("body")[0];
      const anchor = document.createElement("a");
      anchor.href = product?.video;
      body?.appendChild(anchor);
      anchor.click();
      body?.removeChild(anchor);
    }
  };

  const handleYoutubeURL = (url: string) => {
    if (url.includes("https://www.youtube.com/embed/")) {
      return url;
    }
    const searchParams = new URLSearchParams(new URL(url).search);
    const videoId = searchParams.get('v') || "";

    return `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <>
      <SeoComponent
        data={{
          title: product?.meta_title,
          description: product?.meta_description,
          url: `detail/${product?.id}`,
          thumbnaiUrl: product?.eye_catching,
        }}
      />
      <div>
        <section
          id={styles.banner}
          style={{ backgroundImage: "url(" + product?.eye_catching + ")" }}
        ></section>
        <div className={styles["field-top"]}>
          <div className={styles["inner-field"]}>
            <h3>
              <ul className={styles.breadcrumbs}>
                <li>
                  <Link href={`${process.env.domain}`}>トップ</Link>
                </li>
                {
                  categoryParentTitle && (
                    <li>
                      <Link href={`${process.env.domain}/category/${categoryParentTitle.id}`}>{categoryParentTitle.title}</Link>
                    </li>
                  )
                }
                <li>
                  <Link href={`${process.env.domain}/category/${product.category[0].id}`}>
                    {product.category[0].title}
                  </Link>
                </li>
                <li>
                  <p className={styles.currentPage}>{product?.title}</p>
                </li>
              </ul>
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
                        {/* <Image
                          className={styles.image}
                          src={"/image/fb.png"}
                          alt=""
                          fill
                        /> */}
                        <img
                          src={"/image/fb.png"}
                          className={styles.image}
                          alt=""
                        />
                      </Link>
                    </li>
                  )}
                  {product?.social?.instagram && (
                    <li>
                      <Link href={product?.social.instagram} target="_blank">
                        {/* <Image
                          className={styles.image}
                          src={"/image/instagram.png"}
                          alt=""
                          fill
                        /> */}
                        <img
                          src={"/image/instagram.png"}
                          className={styles.image}
                          alt=""
                        />
                      </Link>
                    </li>
                  )}
                  {product?.social?.twitter && (
                    <li>
                      <Link href={product?.social.twitter} target="_blank">
                        {/* <Image
                          className={styles.image}
                          src={"/image/tw.png"}
                          alt=""
                          fill
                        /> */}
                        <img
                          src={"/image/tw.png"}
                          className={styles.image}
                          alt=""
                        />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className={styles["collection-video"]}>
              {product?.youtobe_url ? (
                <iframe
                  src={handleYoutubeURL(product?.youtobe_url)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : product?.video ? (
                <>
                  <video src={product?.video} controls></video>
                  <div
                    className={styles.download}
                    onClick={() => handleDownload()}
                  >
                    <img src="/image/icons/ic_download.svg" alt="" />
                    <p>この動画をダウンロードする</p>
                  </div>
                </>
              ) : (
                <></>
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
                    <div
                      key={e + index}
                      onClick={() => {
                        handleImageModal(e);
                      }}
                    >
                      <img src={e} alt={e} />
                    </div>
                  );
                })}
              </div>
            )}
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
                    <label>備考(決済情報など)</label>
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
          category={product?.category[0]}
        />

        {showModal && (
          <ImageModal imageSrc={imageSrc} handleImageModal={handleImageModal} />
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await ApiService.getProducts(1, 1);
  return {
    paths: data.docs.map((product: any) => ({
      params: { productID: product._id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<DetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  const productID = context.params?.productID;

  if (!productID) return { notFound: true };
  const data = await ApiService.getProductDetail(productID as string);
  if (!data) return { notFound: true };
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
  };

  return {
    // will be passed to the page component as props
    props: {
      product: product,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 10, // In seconds
  };
};
