import { memo } from "react";
import { Helmet as HelmetLib } from "react-helmet";

interface HelmetProps {
  metaImg?: string;
  metaTitle?: string;
  metaDescription?: string;
  title: string;
  children: any;
}

const Helmet = (props: HelmetProps) => {
  return (
    <>
      <HelmetLib>
        {/* HTML Meta Tags */}
        <title>{`Yolo - ` + props.title}</title>
        <meta
          name="description"
          content={props?.metaDescription || "Yolo - Cửa hàng Yolo"}
        />
        {/* Facebook Meta Tags */}
        <meta
          property="og:url"
          content="https://ecommerce-shop-fe.vercel.app/static/media/Logo-2.3f227664b3ce56e8fcde.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={props?.metaTitle || "Cửa hàng Yolo"}
        />
        <meta
          property="og:description"
          content={props?.metaDescription || "Yolo - Cửa hàng Yolo"}
        />
        <meta
          property="og:image"
          content={
            props?.metaImg ||
            "https://ecommerce-shop-fe.vercel.app/static/media/Logo-2.3f227664b3ce56e8fcde.png"
          }
        />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="ecommerce-shop-fe.vercel.app"
        />
        <meta
          property="twitter:url"
          content="https://ecommerce-shop-fe.vercel.app/static/media/Logo-2.3f227664b3ce56e8fcde.png"
        />
        <meta
          name="twitter:title"
          content={props?.metaTitle || "Cửa hàng Yolo"}
        />
        <meta
          name="twitter:description"
          content={props?.metaDescription || "Yolo - Cửa hàng Yolo"}
        />
        <meta
          name="twitter:image"
          content={
            props?.metaImg ||
            "https://ecommerce-shop-fe.vercel.app/static/media/Logo-2.3f227664b3ce56e8fcde.png"
          }
        />
        {/* Meta Tags Generated via https://www.opengraph.xyz */}
      </HelmetLib>
      {props.children}
    </>
  );
};

export default memo(Helmet);
