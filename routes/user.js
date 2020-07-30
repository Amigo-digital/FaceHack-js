const router = require('express').Router();
const User = require('../models/user');


router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/register', async function (req, res, next) {
  if (req.body.password != req.body.password_repeat) {
    res.render('register', {
      error: 'Пароли не совпадают'
    })
     return;
  } 
  try {
    await User.regUser(req.body.email, req.body.login, req.body.password)
  } catch (err) {
    res.render('register', {
      error: err
    })
    return;
  }
  res.redirect('/user/login')
});


router.post('/login', async function (req, res, next) {
  try {
    req.session.authUser = await User.login(req.body.login, req.body.password);
  } catch (error) {
    res.render('login', {
      error: error
    })
    return
  }
  res.redirect('/')
});

router.get('/logout', async (req, res) => {
  delete req.session.authUser
  res.redirect('/')
})

router.get('/:id', async function (req, res, next) {
  const user = await User.findOne(
    {_id: req.params.id });
  res.render('user', {user});
})

module.exports = router;
