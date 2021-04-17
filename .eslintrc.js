module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [

    ],

    // Airbnb style guide with some minor tweaks.

    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        'linebreak-style': 'off',
        'eol-last': ['error', 'never'],
        'max-len': ['error', { code: 450 }],
        'space-before-function-paren': ['error', 'always'],
        'no-unused-vars': 'off',

        // Allow for..in and for..of that Airbnb discourages.
        'no-iterator': 'off',
        'no-restricted-syntax': ['error', 'ForInStatement'],

        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'never'
        }]
    }
}