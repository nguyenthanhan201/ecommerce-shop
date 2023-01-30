import Button from "@/components/shared/Button";
import InfinityList from "@/components/shared/InfinityList";
import { ProductServices } from "@/lib/repo/product.repo";
import { productData } from "@/utils/index";
import { memo, useEffect, useRef, useState } from "react";
import CatalogFilter from "./components/CatalogFilter";

export type FilterType = {
  category: string[];
  color: string[];
  size: string[];
  prices: number[][];
};

const initFilter = {
  category: [],
  color: [],
  size: [],
  prices: [],
};

const CatalogPage = () => {
  const [productList, setProductList] = useState(productData.getAllProducts());
  // console.log("👌 ~ productList", productList);
  const [products, setProducts] = useState(productList);
  // console.log("👌 ~ products", products);
  const [filter, setFilter] = useState<FilterType>(initFilter);
  // console.log("👌 ~ filter", filter);

  useEffect(() => {
    (function updateProducts() {
      let temp = productList;

      if (filter.category.length > 0) {
        temp = temp.filter((e) => {
          const check = filter.category.find(
            (category) => e.categorySlug === category
          );
          return check !== undefined;
        });
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

      if (filter.prices.length > 0) {
        temp = temp.filter((e) => {
          const check = filter.prices.find((price) => {
            return Number(e.price) >= price[0] && Number(e.price) <= price[1];
          });
          return check !== undefined;
        });
      }
      setProducts(temp);
    })();
  }, [filter, productList]);

  useEffect(() => {
    ProductServices.getAll().then((res) =>
      setProductList([...res.data, ...productList])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="catalog">
        <CatalogFilter
          filter={filter}
          setFilter={setFilter}
        />
        {/* <div className="catalog_filter" ref={filterRef}>
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
        </div> */}
        <div className="catalog_content">
          <InfinityList data={products as any} />
        </div>
      </div>
    </>
  );
};

export default memo(CatalogPage);
