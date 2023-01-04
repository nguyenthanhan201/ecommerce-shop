// import AOS from "aos";
// import "aos/dist/aos.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  default as accessoriesData,
  default as productData,
} from "../../assets/fake-data/products";

type PostFiltersFormProps = {
  onSubmit?: (formValue: any) => void;
};

const PostFiltersForm = (props: PostFiltersFormProps) => {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef<any>(null);

  //? Set searchTerm tinh lan cuoi go 300
  const handleSearchTermChange = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };
      onSubmit(formValue);
    }, 300);
  };

  //? Product normal
  let dataSearch = productData.data.cardData.filter((item: any) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toString().toLowerCase())
    );
  });

  //? Products accessories
  let dataSearch2 = accessoriesData.data2.cardData2.filter((item: any) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toString().toLowerCase())
    );
  });

  const toggleFormSearch = () => {
    document.querySelector(".wrapper-form-search")?.classList.toggle("active");
    document.body.classList.toggle("modal-open");
  };

  const mixArray = [...dataSearch, ...dataSearch2];

  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <div className="wrapper-form-search">
      <form className="form-search">
        <p className="form-search_icon">
          <i className="bx bx-x" onClick={toggleFormSearch}></i>
        </p>
        <p className="label">Search something</p>
        <div className="input-box">
          <input
            className=""
            type="text"
            onChange={handleSearchTermChange}
          ></input>
        </div>
        <div className="form-search_result">
          {/* 
          ?Check mixArray empty 
          */}
          {mixArray.length ? (
            mixArray.map((item) => (
              <div className="form-search_result_line" key={item.slug}>
                <img
                  className="form-search_result_line_image"
                  src={item.image01}
                  alt="hoa"
                  loading="lazy"
                />
                <Link to={`/catalog/${item.slug}`}>
                  <p style={{ fontSize: "20px" }} onClick={toggleFormSearch}>
                    {item.title}
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <h1 className="search-none">
              Không tìm thấy kết quả : "{searchTerm}"
            </h1>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostFiltersForm;
