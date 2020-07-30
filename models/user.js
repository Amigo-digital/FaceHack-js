const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

// хеширую пароль
function hashPass(str) {
  const salt = 'Max'
  return require('crypto').createHash('md5').update(str + salt).digest('hex');
}

// регистрация юзера
userSchema.statics.regUser = async function (email, login, password) {
  const existUser = await this.findOne({
    login: login
  })
  if (existUser) throw new Error('Этот пользователь уже зарегестрирован в системе')
  const user = new this({
    email: email,
    login: login,
    password: hashPass(password),
  })
  await user.save()
  return user
}

// проверка логина
userSchema.statics.login = async function (login, password) {
  const user = await this.findOne({ login: login })
  if (!user) throw new Error('Пользователь не существует')
  if (user.password !== hashPass(password)) throw new Error('Неправильный пароль')
  return user
}

module.exports = mongoose.model('users', userSchema);
