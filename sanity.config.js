import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: "SMADS CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // 🔥 FIX LAG TRIỆT ĐỂ
  form: {
    unstable: {
      value: {
        autoSave: {
          threshold: 10000, // 10 giây
          interval: 10000
        }
      }
    }
  },

  studio: {
    unstable_autosave: {
      enabled: false // 🔥 TẮT AUTO-SAVE
    }
  },

  // TẮT REAL-TIME UPDATES
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true, // Dùng CDN để giảm API calls
    withCredentials: false
  },

  // TẮT LIVE PREVIEW
  live: {
    enabled: false // 🔥 QUAN TRỌNG: Tắt live preview
  }
});