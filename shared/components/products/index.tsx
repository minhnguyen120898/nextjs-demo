import React from "react";
import Slider from "react-slick";
import { ProductModel } from "@/models/product.models";
import styles from "./products.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export interface ProductComponentProps {
  productList: ProductModel[],
  categoryID?: string
}

export default function ProductComponent(props: ProductComponentProps) {
  const router = useRouter();
  const { productList, categoryID } = props;

  const settingsNextCategory = {
    dots: false,
    infinite: false,
    slidesToShow: Math.min(productList.length, 4),
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: Math.min(productList.length, 3),
        },
      },
    ],
  };

  return (
    <>
      <div className={styles.building + " building"}>
        <div className={styles.building_top}>
          <div className={styles.imageContainer}>
            <Image
              src={"/image/noimage.png"}
              className={styles.image}
              alt=""
              fill
            />
          </div>
          <h3>おすすめ</h3>
          <Link href={`/category/${categoryID}`}>すべて見る</Link>
        </div>
        <div className={styles.content}>
          <Slider
            className={styles["slick-slider2"] + " " + "slider-slider2"}
            {...settingsNextCategory}
          >
            {productList.map((item, index) => {
              return (
                <div 
                  className={styles.element} 
                  key={item.id}
                  onClick={() => router.push(`/detail/${item.id}`)}
                >
                  {/* <Image
                    src={item.eye_catching}
                    className={styles["element-image"]}
                    alt=""
                    fill
                  /> */}
                  <img src={item.eye_catching} className={styles["element-image"]} alt="" />
                  <div className={styles["content-element"]}>
                    <div>
                      {item.tags?.map((tag, j) => {
                        return <label key={j}>#{tag.title}</label>;
                      })}
                    </div>
                    <span>{item.title}</span>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
