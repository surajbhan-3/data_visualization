

function Stats({saleData,month}) {

  function getMonthName(monthNumber) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const index = monthNumber - 1;
  
    if (index >= 0 && index < months.length) {
      return months[index];
    } else {
      return 'Invalid Month'; 
    }
  }
  
  return (
    <div className="div-wrapper sl">
      <div className="tsa">Total Sals Amount: {saleData.totalAmount}</div>
      <div className="tsa">Total Sold Items: {saleData.totalSoldItems}</div>
      <div className="tsa">Total Not Sold Items: {saleData.totalNotSoldItems}</div>
      <div className="tsa">Selected Month: {getMonthName(month)}</div>
    </div>
  )
}

export default Stats