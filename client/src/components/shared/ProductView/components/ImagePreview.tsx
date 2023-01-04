import { useEffect } from "react";

type ImagePreviewProps = {
  previewImg: string;
};

const ImagePreview = ({ previewImg }: ImagePreviewProps) => {
  useEffect(() => {
    imageZoom("myimage", "myresult");
  }, [previewImg]);

  useEffect(() => {
    customRightResult();
  }, []);

  // useEffect(() => {
  //   window.addEventListener("load", () => {
  //     imageZoom("myimage", "myresult");
  //   });

  //   return () => {
  //     window.removeEventListener("load", () => {
  //       imageZoom("myimage", "myresult");
  //     });
  //   };
  // }, [previewImg]);

  function imageZoom(imgID: any, resultID: any) {
    var img: any, lens: any, result: any, cx: any, cy: any;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize =
      img.width * cx + "px " + img.height * cy + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    // lens.addEventListener("touchmove", moveLens);
    // img.addEventListener("touchmove", moveLens);
    function moveLens(e: any) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - lens.offsetWidth / 2;
      y = pos.y - lens.offsetHeight / 2;
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) {
        x = img.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - lens.offsetHeight) {
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      /*set the position of the lens:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*display what the lens "sees":*/
      result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
    }
    function getCursorPos(e: any) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  function customRightResult() {
    window.addEventListener("load", () => {
      var elementResult: any = document.querySelector("#myresult");

      // ?Lay cac phan tu tinh toan do dai zoom_result
      var container = Array.from(document.getElementsByClassName("container"));
      // console.log(container[1].clientWidth);
      var product_image: any = document.querySelector(".product_image");
      var num: any =
        (product_image.clientWidth * 100) / container[1].clientWidth;
      // console.log("phan tram cua product_image:" + num.toFixed());

      var widthOfResult = 98 - num.toFixed();
      // console.log("phan tram cua result:" + widthOfResult);

      if (typeof elementResult != "undefined") {
        if (widthOfResult > 51) {
          widthOfResult = 51;
          elementResult.style.width = widthOfResult + "%";
        } else {
          elementResult.style.width = widthOfResult + "%";
        }
      }
    });
  }

  return (
    <div className="img-zoom-container">
      <img id="myimage" src={previewImg} alt="" width="95%" />
      <div id="myresult" className="img-zoom-result"></div>
    </div>
  );
};

export default ImagePreview;
