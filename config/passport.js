const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')
const key = require('../config/keys').secretOrKey

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id)
        if (user) return done(null, user)
        return done(null, false)
      } catch (err) {
        console.log(err)
      }
    })
  )
}
