export function useSEO(
  title: string,
  data: {
    description?: string;
    image?: string;
    keyword?: string;
    shopName?: string;
  } = {}
) {
  return {
    titleTemplate: data.shopName ? `Yolo - %s | ${data.shopName}` : `Yolo - %s`,
    title,
    description: data.description,
    image: data.image,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      site_name: "Yolo",
      title,
      description: data.description,
      images: [
        {
          url: data.image,
          width: 800,
          height: 420,
          alt: data.shopName,
        },
      ],
    },
    additionalMetaTags: [
      {
        property: "keywords",
        content: data.keyword,
      },
    ],
  };
}
