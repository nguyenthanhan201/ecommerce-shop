import { memo, useEffect, useRef, useState } from "react";

import Button from "../components/shared/Button";
import CheckBox from "../components/shared/CheckBox";
import Helmet from "../components/shared/Helmet";

import { getProductsAPI } from "api/productServices";
import category from "../assets/fake-data/category";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import productData from "../assets/fake-data/products";
import InfinityList from "../components/shared/InfinityList";

const initFilter = {
  category: [],
  color: [],
  size: [],
};

const Catalog = () => {
  const [productList, setProductList] = useState(productData.getAllProducts());
  const [products, setProducts] = useState(productList);
  const [filter, setFilter] = useState<any>(initFilter);
  const filterRef = useRef<any>(null);

  useEffect(() => {
    (function updateProducts() {
      let temp = productList;
      // console.log("👌 ~ temp", temp);

      if (filter.category.length > 0) {
        temp = temp.filter((e) => filter.category.includes(e.categorySlug));
      }

      if (filter.color.length > 0) {
        temp = temp.filter((e) => {
          const check = e.colors.find((color) => filter.color.includes(color));
          return check !== undefined;
        });
      }

      if (filter.size.length > 0) {
        temp = temp.filter((e) => {
          const check = e.size.find((size) => filter.size.includes(size));
          return check !== undefined;
        });
      }

      setProducts(temp);
    })();
  }, [filter, productList]);

  useEffect(() => {
    getProductsAPI().then((res) => setProductList([...res, ...productList]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterSelect = (type: any, checked: any, item: any) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.color] });
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item.size] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e: any) => e !== item.categorySlug
          );
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e: any) => e !== item.color);
          setFilter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e: any) => e !== item.size);
          setFilter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

  return (
    <Helmet title="Sản Phẩm">
      {/* {console.log(filter)} */}
      <div className="catalog">
        <div className="catalog_filter" ref={filterRef}>
          <div
            className="catalog_filter_close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog_filter_widget">
            <div className="catalog_filter_widget_title">danh mục sản phẩm</div>
            <div className="catalog_filter_widget_content">
              {category.map((item, index) => (
                <div key={index} className="catalog_filter_widget_content_item">
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect("CATEGORY", input.checked, item)
                    }
                    checked={filter.category.includes(item.categorySlug)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog_filter_widget">
            <div className="catalog_filter_widget_title">màu sắc</div>
            <div className="catalog_filter_widget_content">
              {colors.map((item, index) => (
                <div key={index} className="catalog_filter_widget_content_item">
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect("COLOR", input.checked, item)
                    }
                    checked={filter.color.includes(item.color)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog_filter_widget">
            <div className="catalog_filter_widget_title">kích thước</div>
            <div className="catalog_filter_widget_content">
              {size.map((item, index) => (
                <div key={index} className="catalog_filter_widget_content_item">
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect("SIZE", input.checked, item)
                    }
                    checked={filter.size.includes(item.size)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog_filter_widget">
            <div className="catalog_filter_widget_content">
              <Button size="sm" onClick={clearFilter}>
                xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog_filter_toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            bộ lọc
          </Button>
        </div>
        <div className="catalog_content">
          <InfinityList data={products as any} />
        </div>
      </div>
    </Helmet>
  );
};

export default memo(Catalog);
