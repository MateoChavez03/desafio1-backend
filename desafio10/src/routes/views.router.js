import { Router } from "express";

const router = Router();

router.get('/register',(req,res)=>{
    //res.redirect('login')
    res.render('register');
})

router.get('/login', (req,res)=>{
    if (req.session.user) {
        console.log(req.session.user.name);
        res.redirect('/home')
    } else {
        console.log("no funciona");
        res.render('login')
    }
})

router.get('/home', (req,res) => {
    res.render('home')
})

export default router;