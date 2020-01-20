module.exports = {
    "parser": "babel-eslint",
    "extends": [
        'alloy',
        'alloy/react',
    ],
    "rules": {
        "indent": ["error",4]
    },
    "env": { // 当前生效环境
        "browser": true,
        "node": true
    }
}