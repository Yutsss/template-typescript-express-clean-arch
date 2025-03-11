// eslint-disable-next-line
import { z, ZodType } from 'zod';

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z
      .string({
        required_error: 'Nama kategori tidak boleh kosong',
        invalid_type_error: 'Nama kategori tidak valid',
      })
      .max(255, 'Nama kategori tidak boleh lebih dari 255 karakter'),
  });

  static readonly GET: ZodType = z.object({
    categoryId: z.string({
      required_error: 'ID kategori tidak boleh kosong',
      invalid_type_error: 'ID kategori tidak valid',
    }),
  });

  static readonly GET_ALL: ZodType = z.object({
    search: z
      .string({
        invalid_type_error: 'Pencarian tidak valid',
      })
      .nullish()
      .optional(),
    page: z
      .number({
        invalid_type_error: 'Jumlah halaman tidak valid',
      })
      .nullish()
      .optional(),
    limit: z
      .number({
        invalid_type_error: 'Jumlah limit tidak valid',
      })
      .nullish()
      .optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    categoryId: z.string({
      required_error: 'ID kategori tidak boleh kosong',
      invalid_type_error: 'ID kategori tidak valid',
    }),
    name: z
      .string({
        required_error: 'Nama kategori tidak boleh kosong',
        invalid_type_error: 'Nama kategori tidak valid',
      })
      .max(255, 'Nama kategori tidak boleh lebih dari 255 karakter'),
  });

  static readonly DELETE: ZodType = z.object({
    categoryId: z.string({
      required_error: 'ID kategori tidak boleh kosong',
      invalid_type_error: 'ID kategori tidak valid',
    }),
  });
}
