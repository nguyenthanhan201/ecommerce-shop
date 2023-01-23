import { Product } from "@/lib/redux/types/product.type";
import dynamic from "next/dynamic";
import Button from "./Button";

const ProductView = dynamic(() => import("./ProductView/ProductView"), {
  ssr: false,
});

type ProductViewModelProps = {
  product: Product;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ProductViewModel = ({
  product,
  open,
  setOpen,
}: ProductViewModelProps) => {
  return (
    <div className={`product-view_modal ${open ? "active" : ""}`}>
      <div className="product-view_modal_content">
        {open && <ProductView product={product} />}
        <div className="product-view_modal_content_close">
          <Button
            size="sm"
            icon={""}
            animate={false}
            onClick={() => setOpen(false)}
          >
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModel;
