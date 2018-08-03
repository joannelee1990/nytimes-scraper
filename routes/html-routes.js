
module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index', null);
  });
  app.get('/articles', (req, res) => {
    res.render('articles', null);
  });
};
