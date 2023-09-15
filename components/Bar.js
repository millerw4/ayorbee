const Bar = ({ total = 1, num = 0, color = 'red', bgColor = 'gray' }) => {
  const styleEmpty = {
    width: '20px',
    backgroundColor: bgColor
  }
  const styleFill = {
    width: '20px',
    backgroundColor: color
  }
  return (
    <>
      <div style={{display:'grid'}}>
        {Array(total - num).fill(0).map(() => <div style={styleEmpty}></div>)}
        {Array(num).fill(0).map(() => <div style={styleFill}></div>)}
      </div>
    </>
  )
}

export default Bar