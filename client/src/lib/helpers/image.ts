// export async function uploadImage(image): Promise<{ link: string }> {
//   const data = new FormData();
//   data.append("image", image);

//   try {
//     if (location.hostname == "localhost") {
//       await new Promise((res, rej) => {
//         setTimeout(res, 2000);
//       });
//       return {
//         link: `https://picsum.photos/${250 + Math.floor(Math.random() * 100)}`,
//       };
//     } else {
//       let res = await axios.post("https://api.imgur.com/3/image", data, {
//         headers: {
//           Authorization: "Client-ID dd32dd3c6aaa9a0",
//         },
//       });
//       return res.data.data;
//     }
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

export function compressImage(image: string, compress?: number): string {
  if (!image) return image;

  const imageUrl = image.toString().trim();
  if (image.includes("i.imgur.com")) {
    if (compress && !image.includes(".png")) {
      let suffix = "";
      if (compress < 100) suffix = "s";
      else if (compress < 200) suffix = "t";
      else if (compress < 350) suffix = "m";
      else if (compress < 650) suffix = "l";
      else suffix = "h";
      const dot = image.lastIndexOf(".");
      return imageUrl.slice(0, dot) + suffix + imageUrl.slice(dot);
    } else {
      return imageUrl;
    }
  } else {
    return `https://images.weserv.nl/?url=${imageUrl}${compress ? `&w=${compress}` : ""
      }`;
  }
}
