module.exports = (...context) => {
  // arguments = in template params + a handlebars hash
  // this = in template context
  let value = parseInt(context.slice(0, 1));
  return value + 1;
};
