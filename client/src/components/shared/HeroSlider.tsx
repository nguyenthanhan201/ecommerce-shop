import { HeroSliderData } from "@/utils/fake-data/hero-slider";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import classnames from "classnames";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import Img from "./Img/Img";

type HeroSliderProps = {
  data: HeroSliderData[];
  timeOut?: number;
  auto?: boolean;
  control?: boolean;
};

const HeroSlider = ({ data, timeOut, auto, control }: HeroSliderProps) => {
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
    if (!auto) return;
    const slideAuto = setInterval(() => {
      nextSlide();
    }, timeOut);
    return () => {
      clearInterval(slideAuto);
    };
  }, [nextSlide, timeOut, auto]);

  return (
    <div className="hero-slider">
      {data.map((item, index: number) => (
        <HeroSliderItem
          key={index}
          item={item}
          index={index}
          active={index === activeSlide}
        />
      ))}
      {control && (
        <div className="hero-slider_control">
          <KeyboardArrowLeftOutlinedIcon
            className="hero-slider_control_item"
            onClick={preSlide}
          />
          <div className="hero-slider_control_item">
            <div className="index">
              {activeSlide + 1}/{data.length}
            </div>
          </div>
          <KeyboardArrowRightOutlinedIcon
            className="hero-slider_control_item"
            onClick={nextSlide}
          />
        </div>
      )}
    </div>
  );
};

const HeroSliderItem = ({ item, active, index }: any) => {
  const { t } = useTranslation("home");
  return (
    <div className={classnames("hero-slider_item", { active })}>
      <div className="hero-slider_item_info">
        <div className={`hero-slider_item_info_title color-${item.color}`}>
          <span>{t(`HeroSlider.${index}.title`, "")}</span>
        </div>
        <div className="hero-slider_item_info_description">
          <span>{t(`HeroSlider.${index}.description`, "")}</span>
        </div>
        <div className="hero-slider_item_info_btn">
          <Link href={item.path as any}>
            <Button
              backgroundColor={item.color}
              icon={<ShoppingCartOutlinedIcon fontSize="inherit" />}
              animate={true}
            >
              {t("HeroSliderButton")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="hero-slider_item_image">
        <div className={`shape bg-${item.color}`}></div>
        <Img
          src={item.img}
          alt="oki"
          layout="fill"
          loading={
            item.path === "/catalog/ao-thun-dinosaur-01" ? "eager" : "lazy"
          }
          sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
        />
      </div>
    </div>
  );
};

export default HeroSlider;
