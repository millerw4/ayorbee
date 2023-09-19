const Bar = ({ total = 1, num = 0, color = 'red', bgColor = 'lightGray' }) => {
  const styleEmpty = {
    width: '20px',
    backgroundColor: bgColor
  }
  const styleFill = {
    width: '20px',
    backgroundColor: color
  }
  const styleContainer = {
    margin: '10px 2px',
    borderRadius: '10px',
    overflow: 'hidden'
  }
  return (
    <>
      <div style={styleContainer} >
        <div style={{display:'grid', height:'100%'}}>
          {Array(total - num).fill(0).map(() => <div style={styleEmpty}></div>)}
          {Array(num).fill(0).map(() => <div style={styleFill}></div>)}
        </div>
      </div>
    </>
  )
}

export default Bar