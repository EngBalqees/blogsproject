import { Router } from "express";
import UserModel from '../../../DB/model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const app = Router();

//signin
app.post('/',async (req,res) =>{
    const {name,email,password} = req.body;
    var passswordhashed = bcrypt.hashSync(password,8);
    await UserModel.create({name,email,password:passswordhashed});
    return res.status(201).json({message:"success"});
})

//login
app.post('/login',async(req,res)=>{
 const {email,password} = req.body;
 const User = await UserModel.findOne({
    where:{
        email:email,
    }
 });
 if (!User){
    return res.status(404).json({message:'email not found'});
 }
 const check = await bcrypt.compare(password,User.password);
 if (!check){
     return res.status(400).json({message:"Invalid Password"});
 }

 const token = jwt.sign({email: User.email},'hi');
 return res.status(200).json({message:"success",token});
});
app.delete('/:id',async (req,res) =>{
   
})
//token
app.get('/', async (req,res)=>{

});

export default app;