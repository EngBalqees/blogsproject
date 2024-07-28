import userRouter from  './modules/users/user.router.js';
import dbconnection from '../DB/connection.js';
import auth from './modules/auth/auth.router.js';
import BlogRouter from './modules/blogs/blog.router.js'

export const initApp = (app,express)=>{
    dbconnection();
    app.use(express.json());
    app.use('/users',userRouter);
    app.use('/blogs',BlogRouter);
    app.use('/auth', auth);
    app.use('*',(req,res) =>{
        return res.status(404).json({message:"page not found"});
    })
}