import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('node','root','', {
  host: 'localhost',
  dialect: 'mysql'
});

const connectdb = async()=>{
  try{
    return await sequelize.sync();
  }catch(error){
    console.log("error to connect db");
  }
}

export default connectdb;