var marked = require('marked');

marked.setOptions({
  smartypants: true
});

module.exports = function convertToMarkdown(str) {
  return marked(str);
};
