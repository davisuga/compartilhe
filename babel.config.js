module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          root: ["./src/"],
        },
      ],
      [
        "babel-plugin-root-import",
        {
          rootPathPrefix: "~",
          rootPathSuffix: "src",
        },
      ],
    ],
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: [
          "babel-plugin-root-import",
          {
            rootPathPrefix: "~",
            rootPathSuffix: "src",
          },
        ],
      },
    },
  };
};
