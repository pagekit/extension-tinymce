module.exports = [
    {
        entry: {
            "app/bundle/tinyMCE": "./app/tinyMCE"
        },
        output: {
            filename: "./[name].js"
        },
        externals: {
            "lodash": "_",
            "jquery": "jQuery",
            "vue": "Vue",
            "uikit": "UIkit"
        },
        module: {
            loaders: [
                {test: /\.vue$/, loader: "vue"}
            ]
        }
    }
];