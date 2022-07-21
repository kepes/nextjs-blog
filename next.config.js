module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["scontent-vie1-1.cdninstagram.com", 'localhost'],
    loader: "default",
  },

  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};
