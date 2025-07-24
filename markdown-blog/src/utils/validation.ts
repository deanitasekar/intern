import z from "zod";

export const articleSchema = z.object({
  title: z
    .string()
    .nonempty("Judul tidak boleh kosong")
    .min(3, "Judul minimal 3 karakter")
    .max(100, "Judul maksimal 100 karakter"),

  description: z
    .string()
    .nonempty("Deskripsi tidak boleh kosong")
    .min(10, "Deskripsi minimal 10 karakter")
    .max(300, "Deskripsi maksimal 300 karakter"),

  content: z
    .string()
    .nonempty("Konten tidak boleh kosong")
    .min(20, "Konten minimal 20 karakter"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
