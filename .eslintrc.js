module.exports = {
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'standard',
    'standard-react',
    'standard-jsx',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    'react-hooks',
    'jsx-a11y'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
  globals: {
    React: 'writable'
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: [
          '.ts',
          '.tsx'
        ]
      }
    }
  }
}
