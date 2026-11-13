import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  telegram_username: z.string().trim().max(100).optional().or(z.literal("")),
  project_type: z.string().trim().min(2).max(100),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(4000),
  website: z.string().optional() // honeypot: must remain empty
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200)
});

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().min(2).max(220).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.string().trim().max(100).optional(),
  description: z.string().trim().max(8000).optional(),
  image_url: z.string().trim().url().optional().or(z.literal("")),
  demo_url: z.string().trim().url().optional().or(z.literal("")),
  github_url: z.string().trim().url().optional().or(z.literal("")),
  technologies: z.array(z.string().trim().max(60)).max(20).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true)
});