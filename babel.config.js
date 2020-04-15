module.exports = {
    "presets": [
      ["@babel/preset-env", { 
        // adds polyfills globally, exclusive to @babel/transform-runtime
        // "useBuiltIns": "usage", 
        // "corejs": { 
        //   "version": "3", 
        //   "proposals": "true", 
        //   "modules": "false"
        // } 
      }],
      ["@babel/preset-react", { 
        // "runtime": "automatic" 
      }]
    ],
    "plugins": [
      ["@babel/plugin-transform-runtime", { corejs: 3 }],
      "react-hot-loader/babel",
      "@babel/plugin-proposal-class-properties"
    ]
}
