import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Quizz Application",
        theme_color: "#6F00FF",
        short_name: "Quizz",
        description: "Quiz Application PWA",
        icons: [
          {
            src: "pwa.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa.png",
            sizes: "256x256",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
