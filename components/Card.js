const embedStyle = {
  height: '100%',
  width: '100%',
};
// const embedWindowStyle = {
//   height: 'inherit',
//   overflow: 'hidden'
// };
const Card = ({ embedLink, handleVote }) => {
  return (
    // <div className='wrap'>
    //   <iframe className='scaled-frame' loading='lazy' sandbox='' scrolling='yes' src={embedLink}></iframe>
    // </div>
    <div className="card">
      <div className="main-content">
        <div className="btn-container">
          <button className="btn delete" onClick={handleVote}>
            Vote
          </button>
        </div>
        <iframe loading='lazy' sandbox='' scrolling='yes' style={embedStyle} src={embedLink}></iframe>
      </div>
    </div>
  )
}

export default Card