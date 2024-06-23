import { useEffect, useState } from "react";
import axios from 'axios';

function Product() {
    const [data, setData] = useState([])
    const [selectedMonth, setSelectedMonth] = useState('');
    const [searchParameter, setSearchParameter] = useState('')
    const [page, setPage] = useState(1)

    useEffect(()=>{
          const fetchProducts = async()=>{
      
             try {
                const response = await axios.get(`http://localhost:4500/all_products?search=${searchParameter}&page=${page}`)
                  console.log(response)
                  console.log(response.data)
                  if(response.data.result === true){
                    setData(response.data.data)
                  }
            } catch (error) {
                console.log(error)
             }
               
          }
          fetchProducts()
    },[searchParameter,page])


    const handleSelectedMonth = async(event)=>{
           setSelectedMonth(event.target.value)
    }

    const handleNext = ()=>{
        setPage(page+1)
    }


    const handlePrevious = ()=>{
        if(page !== 1){
            
            setPage(page-1);
        }
    }

  return (
    <div>
      <div className="top-div div-wrapper">
        <div className="tdl">
            <input type="search" onChange={(e)=>{setSearchParameter(e.target.value)}} placeholder="search transactions"/>
        </div>
        <div className="tdr">
          
            <label htmlFor="selectMonth">Select a Month:</label>
            <input 
            type="month" 
            name="selectMonth"
            id="selectMonth"
            value="2024-03"
            onChange={handleSelectedMonth} />
        </div>
      </div>

      <div className="item-list-div">
        <table>
            <thead>
               
             <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description </th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
             </tr>
                
            </thead>
            <tbody>
               {data.map((el)=>{
                return (
                    <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>{el.title}</td>
                    <td>{el.description.substring(0,40)}</td>
                    <td>{el.price}</td>
                    <td>{el.category}</td>
                    <td>{el.sold?"Sold":'Not Sold'}</td>
                    <td>{el.image}</td>
                </tr>
                )
               })}
            </tbody>
        </table>
      </div>

      <div className="bottom-div div-wrapper">
    
            <div className="bdr">
                Page No: <span>{page}</span>
            </div>
            <div className="bdc">
           <button onClick={handleNext}>Next</button> <button onClick={handlePrevious}>Previous</button>
            
        </div>
        <div>
           <div className="bdl">
            Per Page : <span>10</span>
           </div>
        </div>


        </div>
     
    </div>
  )
}

export default Product