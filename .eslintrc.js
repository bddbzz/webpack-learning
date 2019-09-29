module.exports = {
    "parser": "babel-eslint",
    "plugins": ["babel"],
    "parserOptions": {
        "ecmaFeatures": {
            "generators": true,
        }
    },
    "env": {
        "browser": true
    },
    "extends": "airbnb",
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}