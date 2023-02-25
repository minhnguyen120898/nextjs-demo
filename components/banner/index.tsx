import { BannerModel } from "@/models/banner.models";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Slider from "react-slick";
import styles from "./banner.module.scss";

export interface BannerComponentProps {
  bannerList: BannerModel[]
}

export default function BannerComponent(props: BannerComponentProps) {
  const { bannerList } = props;
  const router = useRouter();

  const settingsBanner = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    variableWidth: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          variableWidth: false,
          arrows: false,
          centerPadding: "37px",
        },
      },
    ],
  };
  const [centerSlideIndex, setCenterSlideIndex] = useState(0);
  
  function calcRightOfCenter(index: number) {
    const length = bannerList.length - 1;
    if (centerSlideIndex === length) {
      return index === 0;
    }
    return index === centerSlideIndex + 1
  }

  return (
    <div className={styles["slider-banner"] + " " + "slider-banner"}>
      <Slider 
        className={styles["slick-slider"]} 
        {...settingsBanner}
        beforeChange={(current, next) => {
          setCenterSlideIndex(next)
        }}>
        { bannerList.map((banner: BannerModel, index) => {
          return (
            <div 
              className={`
                ${styles.item} 
                ${centerSlideIndex === index ? `${styles["slick-center"]}` : ""} 
                ${ calcRightOfCenter(index) ? `${styles["slick-next"]}` : ""}`} 
              key={banner.id} 
              onClick={() => router.push('/abc')}>
              {/* <Image
                src={`${banner.image}`}
                alt={banner.url}
                fill
                className={styles.image}
              /> */}
              <img src={banner.image} alt="" />
            </div>
          )
        })}
      </Slider>
    </div>
  );
}
