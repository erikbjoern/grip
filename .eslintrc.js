require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  // Prerequisite `eslint-plugin-vue`, being extended, sets
  // root property `parser` to `'vue-eslint-parser'`, which, for code parsing,
  // in turn delegates to the parser, specified in `parserOptions.parser`:
  // https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    'prettier/prettier': 'off',
    'object-shorthand': ['error', 'always'],
    'await-promise': 'off',
    semi: ['error', 'never'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'arrow-parens': 'off',
    'object-literal-sort-keys': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-var-requires': 'off',
    'no-cond-assign': ['error', 'always'],
    'no-string-literal': 'off',
    'prefer-const': 'error',
    'no-var': 'warn',
    'member-ordering': 'off',
    'interface-over-type-literal': 'off',
    'array-type': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/multi-word-component-names': 'off',
  },
}
