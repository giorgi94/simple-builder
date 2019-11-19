module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        browser: true
    },
    plugins: [
        "vue"
    ],
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 2017,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended'
    ],
    globals: {
        $root: true,
        $config: true
    },
    rules: {
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        'no-console': 'off',
        'no-debugger': 'off',
        indent: ['error', 4],
        quotes: ['error', 'double'],
        semi: ['error', 'always']
    }
};