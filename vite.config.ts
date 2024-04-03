import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
// @ts-expect-error module exists mf
import { libcurlPath } from "@mercuryworkshop/libcurl-transport"
// @ts-expect-error module exists mf
import { epoxyPath } from "@mercuryworkshop/epoxy-transport"
// @ts-expect-error module exists mf
import { baremuxPath } from "@mercuryworkshop/bare-mux";
import path from "path";
const __dirname = path.resolve();
export default defineConfig({
  esbuild: {
    jsxInject: `import "dreamland/dev";`,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
            src: `${baremuxPath}/**/*`.replace(/\\/g, "/"),
            dest: "mux",
            overwrite: false
        },
        {
          src: `${epoxyPath}/**/*`.replace(/\\/g, "/"),
          dest: "epoxy",
          overwrite: false
        },
        {
          src: `${libcurlPath}/**/*`.replace(/\\/g, "/"),
          dest: "libcurl",
          overwrite: false
        },
      ]
    })
  ],
  server: {
    proxy: {
      "/wisp/": {
        target: "http://nebulaproxy.io/wisp/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/wisp\//, "")
      }
    }
  }
});