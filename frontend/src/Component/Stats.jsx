

function Stats({saleData}) {
  return (
    <div>
      <div>{saleData.totalAmount}</div>
      <div>{saleData.totalSoldItems}</div>
      <div>{saleData.totalNotSoldItems}</div>
    </div>
  )
}

export default Stats