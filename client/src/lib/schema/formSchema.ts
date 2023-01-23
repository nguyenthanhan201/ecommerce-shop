import * as yup from "yup";

export const registerSchema = yup.object().shape({
  title: yup
    .string()
    .required("Tên không được để trống"),
  description: yup
    .string()
    .max(1500, "Mô tả không được quá 700 ký tự")
    .required("Mô tả không được để trống"),
  price: yup
    .string()
    .required("Giá không được để trống"),
  categorySlug: yup
    .string()
    .required("Danh mục không được để trống"),
  image01: yup
    .string()
    .required("Ảnh không được để trống"),
  image02: yup
    .string()
    .required("Ảnh không được để trống"),
  size: yup
    .array()
    .required("Kích thước không được để trống"),
  colors: yup
    .array()
    .required("Màu sắc không được để trống"),
  stock: yup
    .number()
    .min(1, "Số lượng không được nhỏ hơn 1")
    .max(100, "Số lượng không được lớn hơn 100")
    .required("Số lượng không được để trống"),
  discount: yup.number().min(1, "Giảm giá không được nhỏ hơn 1").max(70, "Giảm giá không được lớn hơn 70").notRequired().typeError("Giảm giá phải là số").transform((value, originalValue) => originalValue === "" ? null : value).nullable(true),
});

// export const registerSchema = yup.object().shape({
//   email: yup
//     .string("email should be a string")
//     .email("please provide a valid email address")
//     .required("email address is required"),
//   password: yup
//     .string("password should be a string")
//     .min(5, "password should have a minimum length of 5")
//     .max(12, "password should have a maximum length of 12")
//     .required("password is required"),
//   confirmPassword: yup
//     .string("password should be a string")
//     .oneOf([yup.ref("password")])
//     .required("confirm password is required"),
//   accountType: yup
//     .string("account type should be a string")
//     .oneOf(["personal", "commercial"])
//     .required("account type is required"),
//   remember: yup.boolean().oneOf([true], "Please tick checkbox"),
//   toggle: yup.boolean().oneOf([true], "Please toggle accept"),
// });
