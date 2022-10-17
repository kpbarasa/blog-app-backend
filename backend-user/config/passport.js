const GoogleStrategy = require('passport-google-oauth20').Strategy
const userDataModel = require('../models/user.data.model')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/user/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => { // SAVE USER INFO TO DATABASE
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email:profile.emails[0].value,
          image: profile.photos[0].value,
        }
        console.log(newUser);

        try {
          let userData = await userDataModel.findOne({ googleId: profile.id })

          if (userData) {
            done(null, userData)
          } else {
            userData = await userDataModel.create(newUser)
            done(null, userData)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((userData, done) => {
    done(null, userData.id)
  })

  passport.deserializeUser((id, done) => {
    userDataModel.findById(id, (err, userData) => done(err, userData))
  })
}
