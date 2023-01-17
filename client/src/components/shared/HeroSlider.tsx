import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import Img from "./Img/Img";

type HeroSliderProps = {
  data: any;
  timeOut?: number;
  auto?: boolean;
  control?: boolean;
};

const HeroSlider = (props: HeroSliderProps) => {
  const data = props.data;

  const timeOut = props.timeOut ? props.timeOut : 3000;

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
    setActiveSlide(index);
  }, [activeSlide, data]);

  const preSlide = () => {
    const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
    setActiveSlide(index);
  };

  useEffect(() => {
    if (!props.auto) return;
    const slideAuto = setInterval(() => {
      nextSlide();
    }, timeOut);
    return () => {
      clearInterval(slideAuto);
    };
  }, [nextSlide, timeOut, props]);

  return (
    <div className="hero-slider">
      {data.map((item: any, index: number) => (
        <HeroSliderItem
          key={index}
          item={item}
          active={index === activeSlide}
        />
      ))}
      {props.control ? (
        <div className="hero-slider_control">
          <div className="hero-slider_control_item" onClick={preSlide}>
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="hero-slider_control_item">
            <div className="index">
              {activeSlide + 1}/{data.length}
            </div>
          </div>
          <div className="hero-slider_control_item" onClick={nextSlide}>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const HeroSliderItem = (props: any) => (
  <div className={`hero-slider_item ${props.active ? "active" : ""}`}>
    <div className="hero-slider_item_info">
      <div className={`hero-slider_item_info_title color-${props.item.color}`}>
        <span>{props.item.title}</span>
      </div>
      <div className="hero-slider_item_info_description">
        <span>{props.item.description}</span>
      </div>
      <div className="hero-slider_item_info_btn">
        <Link href={props.item.path as any}>
          <Button
            backgroundColor={props.item.color}
            icon={<ShoppingCartOutlinedIcon fontSize="inherit" />}
            animate={true}
          >
            xem chi tiết
          </Button>
        </Link>
      </div>
    </div>
    <div className="hero-slider_item_image">
      <div className={`shape bg-${props.item.color}`}></div>
      <Img src={props.item.img} alt="oki" layout="fill" loading="eager" />
    </div>
  </div>
);

export default HeroSlider;
