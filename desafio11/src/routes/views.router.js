import { Router } from "express";

const router = Router();

router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/login', (req,res)=>{
    if (req.session.user) {
        res.redirect('/home')
    } else {
        res.render('login')
    }
})

router.get('/home', async (req,res) => {
    res.render('home', {user: req.session.user})
})

router.get('/logout', async (req, res) => {
    res.render('logout', {user: req.session.user});
    req.session.destroy()
})

/* router.get('/loginFail', (req, res) => {
    res.render('loginfail')
})

router.get('/registerFail', async (req, res) => {
    res.render('registerFail')
})
*/

export default router;