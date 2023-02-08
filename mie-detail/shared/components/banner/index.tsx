import { BannerModel } from "@/models/banner.models";
import { BannerService } from "@/service/index";
import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import styles from "./banner.module.scss";

export interface BannerComponentProps {}

export default function BannerComponent(props: BannerComponentProps) {
  const [bannerList, setBannerList] = useState<BannerModel[]>([]); 
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

  useEffect(() => {
    console.log(process.env.host);
    const getBannerList = async () => {
      try {
        const { data } = await BannerService.getBanners(1,50);
        const convertData: BannerModel[] = data.docs.map((el: any) => {
          return {
            ...el,
            id: el._id
          }
        })
        setBannerList(convertData);
      } catch (error) {
        console.error(error);
      }
    }

    getBannerList();
  }, [])

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
