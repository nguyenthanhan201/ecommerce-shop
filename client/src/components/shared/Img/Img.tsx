type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  compressed?: boolean;
};

const Img = ({ src, alt, className, compressed }: ImgProps) => {
  return (
    <img
      src={compressed ? `https://img.gs/hhrgwpnklm/full/${src}` : src}
      alt={alt}
      className={className}
      loading="lazy"
      sizes="(max-width: 600px) 100vw, 600px"
    />
  );
};

export default Img;
