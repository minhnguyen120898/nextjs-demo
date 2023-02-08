import { BannerModel } from "@/models/banner.models";
import React from "react";
import Slider from "react-slick";
import styles from "./banner.module.scss";

export interface BannerComponentProps {
  bannerList: BannerModel[]
}

export default function BannerComponent(props: BannerComponentProps) {
  const { bannerList } = props;
  const settingsBanner = {
    dots: true,
    arrows: true,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    variableHeight: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          centerMode: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className={styles["slider-banner"] + " " + "slider-banner"}>
      <Slider className={styles["slick-slider"]} {...settingsBanner}>
        { bannerList.map((banner: BannerModel) => {
          return (
            <div className={styles.item + " " + "item"} key={banner.id}>
              <img src={banner.image} alt={banner.url} />
            </div>
          )
        })}
      </Slider>
    </div>
  );
}
