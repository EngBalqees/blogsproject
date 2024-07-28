import { Router } from "express";
import UserModel from "../../../DB/model/user.model.js";
import { where } from "sequelize";
import jwt from 'jsonwebtoken';

const app = Router({caseSensitive:true})


//get all users
app.get('/',async (req,res) => {
   const {token} =req.headers;
   const decoded = jwt.verify(token,'hi');
   if(decoded.name != 'Balqees'){
      return res.status(400).json({message:"not authenticated user"});
   }
  const users = await UserModel.findAll({
   attributes: ['name','email']
  });
  return res.status(200).json({message:"success",users:users});
})
//delete user
app.delete('/:id',async(req,res)=>{
   try{
   const {token} = req.headers;
   const decoded = jwt.verify(token,'hi');
   if(decoded.name != 'Balqees'){
       return res.status(400).json({message:"not authenticated user"});
   }
   const {id} = req.params;
   const user = await UserModel.destroy({
      where:{
         id:id
      }
   });
   if(!user){
      return res.status(404).json({message: "user not found"})
   }
   return res.status(200).json({message:"success"});
}catch(error){
   return res.status(400).json({message:"catch error"});
}
});
//update user
app.put(':/id',async(req,res)=>{
   const {id} = req.params;
   const {name} = req.body;
   const user = await UserModel.update(
      {name:name},{
         where:{
            id:id
         },
      }
   );
   if(!user[0]){
      return res.status(404).json({message:"user not found"});
   }
   return res.status(200).json({message:"success"});
})

export default app;