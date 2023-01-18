import Image from "next/legacy/image";

declare const VALID_LAYOUT_VALUES: readonly [
  "fill",
  "fixed",
  "intrinsic",
  "responsive",
  undefined
];
declare type LayoutValue = typeof VALID_LAYOUT_VALUES[number];
// declare type ImgElementStyle = NonNullable<
//   JSX.IntrinsicElements["img"]["style"]
// >;
type Props = {
  id?:string
  src: string;
  alt: string;
  width?: number | undefined;
  height?: number | undefined;
  className?: string;
  objectPosition?: string | undefined;
  layout?: LayoutValue;
  sizes?: string;
  unoptimized?: boolean;
  compress?: number;
  hasNotplaceholder?: boolean;
  priority?: boolean;
  loading?: "eager" | "lazy";
  onClick?: () => void;
};

const myLoader = ({ src, width, quality }: any) => {
  return `${src}?w=${width}&q=${quality}`;
};

const Img = ({
  id,
  src,
  alt,
  width,
  height,
  className,
  objectPosition,
  layout,
  sizes,
  unoptimized,
  compress,
  hasNotplaceholder,
  priority,
  loading,
  onClick,
}: Props) => {
  return (
    <Image
      id={id}
      objectPosition={objectPosition}
      layout={layout && layout}
      loading={loading || "lazy"}
      placeholder={hasNotplaceholder ? undefined : "blur"}
      blurDataURL={"/images/favicon.png"}
      loader={myLoader}
      src={
        compress
          ? `https://images.weserv.nl/?url=${src}${
              compress ? `&w=${compress}` : ""
            }`
          : src
      }
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes || undefined}
      unoptimized={unoptimized || false}
      quality={70}
      priority={priority}
      onClick={onClick}
    />
  );
};

export default Img;
