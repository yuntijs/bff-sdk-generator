import { defineConfig } from "father";

export default defineConfig({
  umd: {
    entry: {
      "src/index": {
        name: "BffSDKLibrary",
      },
    },
    sourcemap: true,
    externals: {
      react: "var window.React",
      antd: "var window.antd",
    },
  },
  esm: { input: "src" },
  // cjs: { input: 'src' },
  // prebundle: {},
});
