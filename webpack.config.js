var config = {
    entry: {
        menu: "./index.tsx",
       // tchatReact: "./build/chat/client/renduTchat.js",
       // jeu1React: "./build/jeu1_adressageRoutage/client/renduJeu1.js"
    }, // Les clés remplacent name ci-dessous.
    output: {
        path: __dirname+ '/build',
        filename: "index.bundle.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        inline: true,
        contentBase: './',
        port: 3000
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};

module.exports = config;
