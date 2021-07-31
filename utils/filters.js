const moment = require('moment');

module.exports = {
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  htmlDateString: (dateObj) => {
    return moment(dateObj).format('yyyy-LL-dd');
  },

  readableDate: (dateObj) => {
    return moment(dateObj).format("MMM Do, YYYY");
  },

  randomItem: (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random();
    });
    return arr.slice(0, 1);
  },

  extractExcerpt: (article) => {
      let excerpt = null;
      const content = article;

      // The start and end separators to try and match to extract the excerpt
      const separatorsList = [
        { start: '<!--StartFragment-->', end: '<!--EndFragment-->' },
        { start: ' ', end: ' ' }
      ];

      separatorsList.some(separators => {
        const startPosition = content.indexOf(separators.start);
        const endPosition = content.indexOf(separators.end);

        if (startPosition !== -1 && endPosition !== -1) {
          excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
          return true; // Exit out of array loop on first match
        }
      });

      return excerpt;
  },

  random: (arr, n) => {
      var result = new Array(n),
          len = arr.length,
          taken = new Array(len);
      if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
  },

  limit: (arr, limit) => {
      return arr.slice(0, limit);
  },

  toTitleCase: (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  },

  w3cDate: (value)  => {
    const dateObject = new Date(value);
    return dateObject.toISOString();
  }

}