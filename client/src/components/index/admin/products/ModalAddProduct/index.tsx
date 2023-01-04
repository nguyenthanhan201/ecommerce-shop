import { yupResolver } from "@hookform/resolvers/yup";
import { Button, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createProductAPI, updateProductAPI } from "api/productServices";
import Input from "components/shared/Input/Input";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useToast } from "lib/providers/toast-provider";
import { Product } from "lib/redux/slices/products";
import { GET_PRODUCTS } from "lib/redux/types";
import { registerSchema } from "lib/schema/formSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ModalAddProductProps = {
  product?: Product;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const listCategorySlug = ["ao-thun", "ao-somi", "quan-jean"];
const listSize = ["s", "m", "l", "xl", "xxl"];
const listColor = ["white", "pink", "black", "yellow", "orange", "blue"];

const ModalAddProduct = ({ product }: ModalAddProductProps) => {
  const {
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
    },
  });
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [img1, setImg1] = useState(product?.image01);
  // console.log("👌 ~ img1", img1);
  const [img2, setImg2] = useState(product?.image02);

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
      <Input
        {...register("price")}
        type="text"
        placeholder="Giá sản phẩm"
        label="price"
        name="price"
        error={errors.price?.message}
      />
      <Input
        {...register("description")}
        type="text"
        placeholder="Mô tả sản phẩm"
        label="description"
        name="description"
        error={errors.description?.message}
      />
      <FormControl fullWidth sx={{ marginTop: "20px" }}>
        <InputLabel>categorySlug</InputLabel>
        <Select
          defaultValue={product?.categorySlug || ""}
          label="categorySlug"
          {...register("categorySlug")}
          error={Boolean(errors.categorySlug?.message)}
        >
          {listCategorySlug.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: "20px" }}>
        <InputLabel id="demo-multiple-name-label">Size</InputLabel>
        <Select
          {...register("size")}
          multiple
          defaultValue={product?.size || []}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          error={Boolean(errors.size?.message)}
        >
          {listSize.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: "20px" }}>
        <InputLabel id="demo-multiple-name-label">Colors</InputLabel>
        <Select
          {...register("colors")}
          multiple
          defaultValue={product?.colors || []}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          error={Boolean(errors.colors?.message)}
        >
          {listColor.map((color) => (
            <MenuItem key={color} value={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
