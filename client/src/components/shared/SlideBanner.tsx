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

          <label htmlFor="slide1" className="left-arrow">
            {" "}
            <i className="bx bx-left-arrow-alt"></i>{" "}
          </label>
          <label htmlFor="slide2" className="left-arrow">
            {" "}
            <i className="bx bx-left-arrow-alt"></i>{" "}
          </label>
          <label htmlFor="slide3" className="left-arrow">
            {" "}
            <i className="bx bx-left-arrow-alt"></i>{" "}
          </label>
          <label htmlFor="slide4" className="left-arrow">
            {" "}
            <i className="bx bx-left-arrow-alt"></i>{" "}
          </label>
          <label htmlFor="slide5" className="left-arrow">
            {" "}
            <i className="bx bx-left-arrow-alt"></i>{" "}
          </label>

          <label htmlFor="slide1" className="right-arrow">
            {" "}
            <i className="bx bx-right-arrow-alt"></i>{" "}
          </label>
          <label htmlFor="slide2" className="right-arrow">
            {" "}
            <i className="bx bx-right-arrow-alt"></i>{" "}
          </label>
          <label htmlFor="slide3" className="right-arrow">
            {" "}
            <i className="bx bx-right-arrow-alt"></i>{" "}
          </label>
          <label htmlFor="slide4" className="right-arrow">
            {" "}
            <i className="bx bx-right-arrow-alt"></i>{" "}
          </label>
          <label htmlFor="slide5" className="right-arrow">
            {" "}
            <i className="bx bx-right-arrow-alt"></i>{" "}
          </label>

          <div className="carousel">
            <ul>
              <li>
                <img src={"/assets/images/banner.png"} alt="" />
              </li>
              <li>
                <img src={"/assets/images/banner.png"} alt="" />
              </li>
              <li>
                <img src={"/assets/images/banner.png"} alt="" />
              </li>
              <li>
                <img src={"/assets/images/banner.png"} alt="" />
              </li>
              <li>
                <img src={"/assets/images/banner.png"} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideBanner;
