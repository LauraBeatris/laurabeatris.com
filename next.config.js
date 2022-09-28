/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          name: '[name].[ext]',
          esModule: false
        }
      }
    })

    if (isServer) {
      require('./src/scripts/generate-sitemap')
    }

    return config
  },
  images: {
    domains: ['media.graphassets.com']
  },
  swcMinify: true
}
