import { createProductAPI, updateProductAPI } from "@/api/productServices";
import { GET_PRODUCTS } from "@/lib/redux/types";
import { Product } from "@/lib/redux/types/product.type";
import { category, colors, size } from "@/utils/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Input from "components/shared/Input/Input";
import Select from "components/shared/Select/Select";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useToast } from "lib/providers/toast-provider";
import { registerSchema } from "lib/schema/formSchema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type ModalAddProductProps = {
  product?: Product;
};

const ModalAddProduct = ({ product }: ModalAddProductProps) => {
  const {
    getValues,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      title: product?.title,
      image01: product?.image01,
      image02: product?.image02,
      price: product?.price,
      slug: product?.slug,
      categorySlug: product?.categorySlug,
      size: product?.size,
      colors: product?.colors,
      description: product?.description,
      stock: product?.stock,
      discount: product?.discount,
    },
  });
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [img1, setImg1] = useState(product?.image01 || "");
  const [img2, setImg2] = useState(product?.image02 || "");
  const editorContent = watch("description");

  useEffect(() => {
    register("description");
  }, [register]);

  const onEditorStateChange = (editorState: any) => {
    setValue("description", String(editorState));
  };

  const formSubmit = (data: Product) => {
    if (product)
      return toast.promise(
        "Cập nhật sản phẩm thành công",
        updateProductAPI({
          ...data,
          _id: product._id,
        }).then(() => {
          dispatch({ type: GET_PRODUCTS });
        }),
        "Cập nhật sản phẩm thất bại"
      );
    return toast.promise(
      "Thêm sản phẩm thành công",
      createProductAPI(data).then(() => {
        dispatch({ type: GET_PRODUCTS });
      }),
      "Thêm sản phẩm thất bại"
    );
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {product ? <h1>Cập nhật sản phẩm</h1> : <h1>Thêm sản phẩm</h1>}
      <Input
        {...register("title")}
        type="text"
        placeholder="Tên sản phẩm"
        label="title"
        name="title"
        error={errors.title?.message}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.5rem",
          gap: "12px",
        }}
      >
        <div style={{ width: "50%" }}>
          <Input
            {...register("image01")}
            type="text"
            placeholder="Ảnh sản phẩm"
            label="image01"
            name="image01"
            error={errors.image01?.message}
            onChange={(e) => {
              setImg1(e.target.value);
            }}
          />
          <img src={img1} alt="image01" />
        </div>
        <div style={{ width: "50%" }}>
          <Input
            {...register("image02")}
            type="text"
            placeholder="Ảnh sản phẩm"
            label="image02"
            name="image02"
            error={errors.image02?.message}
            onChange={(e) => {
              setImg2(e.target.value);
            }}
          />
          <img src={img2} alt="image02" />
        </div>
      </div>
      <Input
        {...register("stock")}
        type="number"
        placeholder="Số lượng"
        label="stock"
        name="stock"
        error={errors.stock?.message}
      />
      <Input
        {...register("price")}
        type="number"
        placeholder="Giá sản phẩm"
        label="price"
        name="price"
        error={errors.price?.message}
      />
      <Input
        {...register("discount")}
        type="number"
        placeholder="Phần trăm giảm giá"
        label="discount"
        name="discount"
        error={errors.discount?.message}
      />
      <Input
        type="editor"
        label="editor"
        value={editorContent}
        onChange={onEditorStateChange as any}
        placeholder="Mô tả sản phẩm"
        error={errors.description?.message}
      />
      <Select
        {...register("categorySlug")}
        defaultValue={product?.categorySlug || ""}
        label="CategorySlug"
        error={errors.categorySlug?.message}
      >
        {category.map((item) => (
          <MenuItem key={item.categorySlug} value={item.categorySlug}>
            {item.display}
          </MenuItem>
        ))}
      </Select>
      <Select
        {...register("size")}
        defaultValue={product?.size || []}
        multiple
        label="Size"
        error={errors.size?.message}
      >
        {size.map((size) => (
          <MenuItem key={size.size} value={size.size}>
            {size.display}
          </MenuItem>
        ))}
      </Select>
      <Select
        {...register("colors")}
        defaultValue={product?.size || []}
        multiple
        label="Colors"
        error={errors.colors?.message}
      >
        {colors.map((color) => (
          <MenuItem key={color.color} value={color.color}>
            {color.display}
          </MenuItem>
        ))}
      </Select>
      <Button
        type="submit"
        variant="contained"
        style={{ width: "100%", marginTop: "20px" }}
      >
        {product ? "Cập nhật" : "Thêm sản phẩm"}
      </Button>
    </form>
  );
};

export default ModalAddProduct;
