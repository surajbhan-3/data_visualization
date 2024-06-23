const express = require('express');
const cors = require('cors')
const  {ProductModel} = require('./model/product.model');
const {connection} = require('./config/db')
require('dotenv').config();
const PORT = process.env.PORT;


const app = express()

app.use(express.json())
app.use(cors())


app.get('/', async(req,res)=>{

    try {
        return res.status(200).send("Welcome to data-visualization backend")
    } catch (error) {
        return res.status(500).send({"message":"Internal server error"})
    }
})


app.get('/all_products', async(req,res)=>{
    const { search = '', page = 1, perPage = 10 } = req.query; //* The default values assigned in case of 
    const query = {$or:[
        {title:{$regex:search, $options:'i'}},
        {description:{$regex:search, $options:'i'}},
        {price:isNaN(Number(search)?undefined:Number(search))}
    ]};
console.log(req.query)
console.log(search, 'sfasdfas')
     
     try {
      const allTransactions = await ProductModel.find(search ? query : {}).skip((page-1)*perPage)
      .limit(Number(perPage)) 
      return res.status(200).send({data:allTransactions, message:"successfull", result:true})
     } catch (error) {
       return res.status(500).send({"message":'Internal server error', result:false})
     }
})


app.get('/statistics', async(req,res)=>{
    const { month, year } = req.query; //* The default values assigned in case of 
 
    const startDate = new Date(Date.UTC(year, month-1, 1))
    const endDate = new Date(Date.UTC(year, month,1) )
    

console.log(startDate, endDate, 'sdfkkasdfj')

    
     try {
      const totalSales = await ProductModel.aggregate([
        { $match:{sold:"true", dateOfSale:{$gte:startDate,$lt:endDate}}},
        {    $group:{  _id:null, totalAmount: {$sum:'$price'}  }  }
    ])
      console.log(totalSales, 'sfsdfsd')

      const totalSoldItems = await ProductModel.findOne({
        sold:"true"
      }) 
      console.log(totalSoldItems, 'totalsold imtes')


      const totalNotSoldItems = await ProductModel.find({
        sold:"false",
        dateOfSale:{$gte:startDate,$lt:endDate}

      }) 
      
      console.log(totalNotSoldItems, 'totalsalses')


    //   return res.status(200).send({data:totalSales, message:"successfull", result:true})
     } catch (error) {
        console.log(error)
       return res.status(500).send({"message":'Internal server error', error:error.message, result:false})
     }
})



app.listen(PORT, async()=>{
    try {
        await connection;
        console.log("database is connected")
    } catch (error) {
       console.log(error)     
    }
    console.log(`server is running at ${PORT}`)
})



