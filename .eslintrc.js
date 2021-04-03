module.exports = {
  extends: [
    'plugin:react/recommended',
    'standard',
    'standard-react',
    'standard-jsx',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  plugins: [
    'react-hooks',
    'jsx-a11y',
    'import'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal'],
      'newlines-between': 'always-and-inside-groups'
    }]
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
