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
    const {month} = req.query; //* The default values assigned in case of 
 
    const monthToInt = parseInt(month);

     try {

      const totalSales = await ProductModel.aggregate([
        { $match:{sold:"true",  $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthToInt]
        }  }},
        { $group:{  _id:null, totalAmount: {$sum:'$price'}  }  }
     
    ])
    const totalAmount = totalSales[0].totalAmount

      const totalSoldItems = await ProductModel.countDocuments({
        sold:"true",
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthToInt]
        }
      }) 
   

      const totalNotSoldItems = await ProductModel.countDocuments(
        {
        sold:"false",
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthToInt]
        }
    }) 
      
   return res.status(200).send({data:{totalAmount,totalSoldItems, totalNotSoldItems}, message:"successfull", result:true})
     } catch (error) {
       return res.status(500).send({"message":'Internal server error', error:error.message, result:false})
     }
})




app.get('/range', async(req,res)=>{
    const {month} = req.query; //* The default values assigned in case of 
 
    const monthToInt = parseInt(month);

    
     try {

      const range = await ProductModel.aggregate([
        {
            $match: {
                $expr: { $eq: [{ $month: '$dateOfSale' }, monthToInt] }
            }
        },
        {
            $group: {
                _id: {
                    $switch: {
                        branches: [
                            { case: { $lte: ['$price', 100] }, then: '0-100' },
                            { case: { $lte: ['$price', 200] }, then: '101-200' },
                            { case: { $lte: ['$price', 300] }, then: '201-300' },
                            { case: { $lte: ['$price', 400] }, then: '301-400' },
                            { case: { $lte: ['$price', 500] }, then: '401-500' },
                            { case: { $lte: ['$price', 600] }, then: '501-600' },
                            { case: { $lte: ['$price', 700] }, then: '601-700' },
                            { case: { $lte: ['$price', 800] }, then: '701-800' },
                            { case: { $lte: ['$price', 900] }, then: '801-900' },
                            { case: { $gte: ['$price', 901] }, then: '901-above' }
                        ]
                    }
                },
                count: { $sum: 1 }
            }
        }
    ])


console.log(range, 'rangedata')
   
      
   return res.status(200).send({data:range, message:"successfull", flag:"ok", result:true})
     } catch (error) {
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



