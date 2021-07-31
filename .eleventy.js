const filters = require('./utils/filters.js');
const transforms = require('./utils/transforms.js');
const collections = require('./utils/collections.js');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const now = String(Date.now());

module.exports = function (eleventyConfig) {
    // Folders to copy to build dir (See. 1.1)
    eleventyConfig.addPassthroughCopy("src/static");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("email-templates");

    eleventyConfig.addPassthroughCopy({
        './node_modules/alpinejs/dist/cdn.min.js': './js/alpine.js',
    });

    eleventyConfig.addShortcode('version', function () {
        return now
    });

    eleventyConfig.addShortcode('banner', function (title, options = {}) {
        const {
            image = 'pool-tiles.jpg'
        } = options;
        return `<div class="h-32 lg:h-64 bg-center bg-cover flex items-center justify-center" style="background-image: url('/static/banners/${image}');">
            <h1 class="text-4xl md:text-5xl lg:text-6xl text-white font-bold text-center text-shadow">${ title }</h1>
        </div>`;
    });

    module.exports = function (date, part) {
        var d = new Date(date);
        if (part == 'year') {
          return d.getUTCFullYear();
        }
        var month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        var ordinal = {
          1: "st",
          2: "nd",
          3: "rd",
          21: "st",
          22: "nd",
          23: "rd",
          31: "st"
        };
        return month[d.getMonth()] + " " + d.getDate() + (ordinal[d.getDate()] || "th") + ", " + d.getUTCFullYear();
    };

    // RSS Feed
    eleventyConfig.addPlugin(pluginRss);

    /*
    A simple ISO timestamp for Nunjucks
    */
    module.exports = function (date) {
        let timestamp = new Date();
        const result = timestamp.toISOString();
        return result;
    };

    // Filters
    Object.keys(filters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, filters[filterName])
    });

    // Transforms
    Object.keys(transforms).forEach((transformName) => {
        eleventyConfig.addTransform(transformName, transforms[transformName])
    });

    // Collections
    Object.keys(collections).forEach((collectionName) => {
        eleventyConfig.addCollection(collectionName, collections[collectionName])
    });

    // This allows Eleventy to watch for file changes during local development.
    eleventyConfig.setUseGitIgnore(false);

    return {
        dir: {
            input: "src/",
            output: "dist",
            includes: "_includes",
            layouts: "_layouts"
        },
        templateFormats: ["html", "md", "njk"],
        htmlTemplateEngine: "njk",

        // 1.1 Enable eleventy to pass dirs specified above
        passthroughFileCopy: true
    };
};