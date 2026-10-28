import { defineConfig } from "vite";
import react from "@vitejs/react-viteapp";

export default defineConfig({
  base: "/", // <--- Make sure this is exactly "/"
  plugins: [react()],
});
