import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure"; // ← Đổi deskTool thành structureTool
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
    structureTool({ // ← Đổi thành structureTool
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});