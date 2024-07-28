import { Router } from "express";
import BlogModel from "../../../DB/model/blog.model.js";
import jwt from 'jsonwebtoken';


const app = Router({caseSensitive:true})

//create blog
app.post('/',async (req,res) =>{
  const {token} =req.headers;
   const decoded = jwt.verify(token,'hi');
   if(decoded.name != 'Balqees'){
      return res.status(400).json({message:"not authenticated user"});
   }
   const {title,description} = req.body;
   await BlogModel.create({title,description});
   return res.status(201).json({message:"success"});
});

//get blogs
app.get('/allblogs',(req,res)=>{
   return res.status(200).json({message:"blogs"});
});

//delete blog
app.delete('/:id',async(req,res)=>{
   const {token} =req.headers;
   const decoded = jwt.verify(token,'hi');
   if(decoded.name != 'Balqees'){
      return res.status(400).json({message:"not authenticated user"});
   }
   const {id} = req.params;
   const blog = await BlogModel.destroy({
      where:{
         id:id
      }
   });
   if(!blog){
      return res.status(404).json({message: "blog not found"})
   }
   return res.status(200).json({message:"success"});
});
//update blog
app.put(':/id',async(req,res)=>{
   const {token} =req.headers;
   const decoded = jwt.verify(token,'hi');
   if(decoded.name != 'Balqees'){
      return res.status(400).json({message:"not authenticated user"});
   }
   const {id} = req.params;
   const {title} = req.body;
   const blog = await BlogModel.update(
      {title:title},{
         where:{
            id:id
         },
      }
   );
   if(!blog[0]){
      return res.status(404).json({message:"blog not found"});
   }
   return res.status(200).json({message:"success"});
})
export default app;