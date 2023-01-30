import CheckBox from "@/components/shared/CheckBox";
import { memo, useEffect } from "react";

type Props = {
  filter: any;
  filterSelect: (type: any, checked: any, item: any) => void;
  filterContent: any;
  customValueInclude?: string;
};

const CatalogFilterItem = ({
  filter,
  filterContent,
  filterSelect,
  customValueInclude,
}: Props) => {
  useEffect(() => {
    console.log("customValueInclude");
  }, [customValueInclude]);
  return (
    <>
      {filterContent.map((item: any, index: number) => (
        <div key={index} className="catalog_filter_widget_content_item">
          <CheckBox
            label={item.display}
            onChange={(input) =>
              filterSelect(
                customValueInclude?.toUpperCase(),
                input.checked,
                item
              )
            }
            checked={filter.includes(
              customValueInclude ? item[customValueInclude] : item.value
            )}
          />
        </div>
      ))}
    </>
  );
};

export default memo(CatalogFilterItem);
