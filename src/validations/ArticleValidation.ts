// eslint-disable-next-line
import { z, ZodType } from 'zod';

export class ArticleValidation {
  static readonly CREATE: ZodType = z.object({
    title: z
      .string({
        required_error: 'Judul tidak boleh kosong',
        invalid_type_error: 'Judul tidak valid',
      })
      .max(255, 'Judul tidak boleh lebih dari 255 karakter'),

    content: z.string({
      required_error: 'Konten tidak boleh kosong',
      invalid_type_error: 'Konten tidak valid',
    }),

    userId: z.string({
      required_error: 'User ID tidak boleh kosong',
      invalid_type_error: 'User ID tidak valid',
    }),

    categoryId: z.string({
      required_error: 'Category ID tidak boleh kosong',
      invalid_type_error: 'Category ID tidak valid',
    }),

    image: z
      .string({
        invalid_type_error: 'Gambar tidak valid',
      })
      .nullish(),
  });

  static readonly GET = z.object({
    id: z.string({
      required_error: 'ID tidak boleh kosong',
      invalid_type_error: 'ID tidak valid',
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

  static readonly GET_BY_USER_ID: ZodType = z.object({
    userId: z.string({
      required_error: 'User ID tidak boleh kosong',
      invalid_type_error: 'User ID tidak valid',
    }),

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

  static readonly UPDATE: ZodType = z
    .object({
      id: z.string({
        required_error: 'ID tidak boleh kosong',
        invalid_type_error: 'ID tidak valid',
      }),

      title: z
        .string({
          invalid_type_error: 'Judul tidak valid',
        })
        .max(255, 'Judul tidak boleh lebih dari 255 karakter')
        .optional(),

      content: z
        .string({
          invalid_type_error: 'Konten tidak valid',
        })
        .optional(),

      categoryId: z
        .string({
          invalid_type_error: 'Category ID tidak valid',
        })
        .optional(),

      image: z
        .string({
          invalid_type_error: 'Gambar tidak valid',
        })
        .optional()
        .nullish(),
    })

    .refine(
      data => data.title || data.content || data.categoryId || data.image,
      {
        message: 'Setidaknya salah satu field harus diisi',
      },
    );

  static readonly DELETE: ZodType = z.object({
    id: z.string({
      required_error: 'ID tidak boleh kosong',
      invalid_type_error: 'ID tidak valid',
    }),
  });
}
