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
        parser: "babel-eslint",
        sourceType: "module",
        ecmaVersion: 2017,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    globals: {
        gulpInclude: true
    },
    rules: {
        "vue/html-indent": ["error", 4],
        "vue/singleline-html-element-content-newline": "off",
        "vue/max-attributes-per-line": "off",
        "no-console": "off",
        "no-debugger": "off",
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"]
    }
};