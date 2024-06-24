
import { BarChart } from '@mui/x-charts/BarChart';
import {useState,useEffect} from 'react'
import axios from "axios";

function Chart({month}) {
    const [rangeData, setRangeData] = useState([])
    const [isDataFetched, setIsDataFetched] = useState(false);

   console.log(month,'monghts')
  
 
   useEffect(() => {
    const rangeMonth = async () => {
      try {
        const res = await axios.get(`http://localhost:4500/range?month=${month}`);
        console.log(res, ' this is response');
        console.log(res.data);
        if (res.data.result === true) {
          const valueData = [
            '0-100', '101-200', '201-300', '301-400', '401-500',
            '501-600', '601-700', '701-800', '801-901', '901-above'
          ]
          const result = valueData.map(id => {
            const match = res.data.data.find(item => item._id === id);
            return  match ? match.count : 0 ;
          });
          setRangeData(result);
          setIsDataFetched(true)
        }
      } catch (error) {
        console.log(error);
      }
    };

    rangeMonth();
  }, [month]);
 
console.log(rangeData, 'this is rangedasdfasfd')




  return (
    isDataFetched && (<BarChart
      series={[
        { data: rangeData },
      ]}
      height={290}
      xAxis={[{ data: [
        '0-100', '101-200', '201-300', '301-400', '401-500',
        '501-600', '601-700', '701-800', '801-901', '901-above'
      ], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />)
  )
}

export default Chart