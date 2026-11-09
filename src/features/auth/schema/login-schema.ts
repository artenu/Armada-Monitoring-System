import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email atau username wajib diisi")
    .email("Format email tidak valid"),
  password: yup
    .string()
    .required("Kata sandi wajib diisi")
    .min(6, "Kata sandi minimal 6 karakter"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
