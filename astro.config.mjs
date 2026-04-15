import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://www.edmontonspringsgolfcourse.com",
  integrations: [tailwind()],
  compressHTML: true
});
