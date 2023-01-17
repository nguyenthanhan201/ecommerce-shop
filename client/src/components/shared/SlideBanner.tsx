import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Img from "./Img/Img";

const SlideBanner = () => {
  return (
    <>
      <div className="center">
        <div className="carousel-wrapper">
          <input
            id="slide1"
            type="radio"
            name="controls"
            defaultChecked={true}
          />
          <input id="slide2" type="radio" name="controls" />
          <input id="slide3" type="radio" name="controls" />
          <input id="slide4" type="radio" name="controls" />
          <input id="slide5" type="radio" name="controls" />

          <label htmlFor="slide1" className="nav-dot"></label>
          <label htmlFor="slide2" className="nav-dot"></label>
          <label htmlFor="slide3" className="nav-dot"></label>
          <label htmlFor="slide4" className="nav-dot"></label>
          <label htmlFor="slide5" className="nav-dot"></label>

          {Array(5)
            .fill(0)
            .map((_, index) => (
              <label
                key={index}
                htmlFor={`slide${index + 1}`}
                className="left-arrow"
              >
                <ArrowBackOutlinedIcon fontSize="inherit" />
              </label>
            ))}
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <label
                key={index}
                htmlFor={`slide${index + 1}`}
                className="right-arrow"
              >
                <ArrowForwardOutlinedIcon fontSize="inherit" />
              </label>
            ))}

          <div className="carousel">
            <ul>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <li key={index}>
                    <Img
                      src="/images/banner.png"
                      alt="yolo-banner"
                      layout="fill"
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideBanner;
