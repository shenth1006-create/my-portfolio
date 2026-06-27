import { defineCollection, z } from 'astro:content';

const subworkSchema = z.object({
  titleZh: z.string().optional(),
  titleEn: z.string(),
  mediumZh: z.string().optional(),
  mediumEn: z.string().optional(),
  year: z.number().optional(),
  images: z.array(z.string()).default([]),
  descriptionZh: z.string().optional(),
  descriptionEn: z.string().optional(),
});

const works = defineCollection({
  type: 'content',
  schema: z.object({
    titleZh: z.string(),
    titleEn: z.string(),
    year: z.number().optional(),
    yearDisplay: z.string().optional(),
    medium: z.string().optional(),
    mediumEn: z.string().optional(),
    images: z.array(z.string()).default([]),
    homeImages: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    descriptionZh: z.string().optional(),
    descriptionEn: z.string().optional(),
    isExhibition: z.boolean().default(false),
    isGroupWork: z.boolean().default(false),
    isResidency: z.boolean().default(false),
    subworks: z.array(subworkSchema).optional(),
    externalLink: z.string().optional(),
  }),
});

export const collections = { works };
