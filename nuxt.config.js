import path from "path";
import fs from "fs";
import webpack from "webpack";
export default {
  // server: {
  //   host: "0.0.0.0",
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, "server.key")),
  //     cert: fs.readFileSync(path.resolve(__dirname, "server.crt")),
  //   },
  // },
  ssr: true,
  target: "server",
  head: {
    title: "audit-app",
    htmlAttrs: {
      lang: "ru",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "аудит" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap",
      },
    ],
    script: [
      {
        src: "https://kit.fontawesome.com/4d4a6900d5.js",
        crossorigin: "anonymous",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@assets/styles/element-ui/index.css", // ...
    "quill/dist/quill.core.css",
    // for snow theme
    "quill/dist/quill.snow.css",
    // for bubble theme
    "quill/dist/quill.bubble.css",
    // ...
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/element-ui" },
    { src: "@/plugins/nuxt-quill-plugin", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],
  styleResources: {
    scss: ["@assets/styles/scss/*.scss"],
  },

  modules: ["@nuxtjs/axios", "cookie-universal-nuxt"],

  serverMiddleware: {
    "/api": "~/api",
  },

  axios: {
    baseURL:
      process.env.NODE_ENV == "production" ? "https://80.87.110.220:3000/" : "",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js",
      }),
    ],

    transpile: [/^element-ui/],
    extend(config, { isServer, isClient }) {
      config.externals = config.externals || {};
      if (!isServer) {
        config.node = {
          fs: "empty",
        };
        if (Array.isArray(config.externals)) {
          config.externals.push({
            puppeteer: require("puppeteer"),
          });
        } else {
          config.externals.puppeteer = require("puppeteer");
        }
      }
      config.output.globalObject = "this";
      return config;
    },
  },
};
