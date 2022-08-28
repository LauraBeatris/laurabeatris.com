const fs = require('fs')

const globby = require('globby')
const prettier = require('prettier')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'src/pages/**/*{.tsx,.jsx,.js}',
    '!src/pages/_*{.tsx,.jsx,.js}',
    '!src/pages/api'
  ], {
  })

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('./src/', '')
              .replace('pages', '')
              .replace('.tsx', '')

            const route = path === '/index' ? '' : path

            return `
                    <url>
                        <loc>${`https://laurabeatris.com${route}`}</loc>
                    </url>
                `
          })
          .join('')}
    </urlset>
  `

  fs.writeFileSync('public/sitemap.xml', prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  }))
})()
