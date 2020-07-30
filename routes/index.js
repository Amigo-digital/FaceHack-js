const router = require('express').Router();

function isAuth(req, res, next) {
  if (!req.session.authUser) {
    res.redirect('/')
  } else {
    next()
  }
}

router.get('/', async function (req, res, next) {
  
  res.render('index');
});

router.get('/secret', isAuth, function (req, res, next) {
  res.render('secret');
});

module.exports = router
