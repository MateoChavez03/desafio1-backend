import passport from 'passport';
import local from 'passport-local';
import { validatePassword } from '../utils.js';
import GithubStrategy from 'passport-github2';
import userModel from '../models/User.js';

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        if (!email || !password) return done(null, false, { message: "Valores incompletos" })
        const user = await userModel.findOne({ email })
        if (!user) return done(null, false, { message: "Credenciales inválidas" })
        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) return done(null, false, { message: "Contraseña inválida" })
        return done(null, user)
    }))

    passport.use('github', new GithubStrategy({
        clientID: "Iv1.af02ce600d4be093",
        clientSecret: "f2f5eb1c2319aaebb1e716784eec31a4441ed43d",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json;
        const user = await userModel.findOne({email});
        if (!user) {
            const newUser = {
                first_name: name,
                email,
                password: ''
            }
            const result = await userModel.create(newUser);
            return done(null, result);
        }
        done(null, user);
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const result = await userModel.findOne({_id: id})
        done(null, result);
    })

}

export default initializeStrategies;