// import { useState } from 'react'
const embedStyle = {
  height: '100%',
  width: '100%',
};
// const embedWindowStyle = {
//   height: 'inherit',
//   overflow: 'hidden'
// };
const Card = ({ embedLink, handleVote }) => {
  // const [fullscreen, setFullscreen] = useState(false)
  // const clickHandler = (e) => {
  //   console.log('handling click on iframe')
  //   if (fullscreen) {
  //     document.exitFullscreen()
  //   } else {
  //     Element.requestFullscreen();
  //   }
  //   setFullscreen(f => !f)
  // }
  return (
    // <div className='wrap'>
    //   <iframe className='scaled-frame' loading='lazy' sandbox='' scrolling='yes' src={embedLink}></iframe>
    // </div>
    <div className="card" >
      <div className="main-content">
        <div className="btn-container">
          <button className="btn delete" onClick={handleVote}>
            Vote
          </button>
        </div>
        <iframe loading='lazy' sandbox='' scrolling='yes' allowFullScreen='true' style={embedStyle} src={embedLink}></iframe>
      </div>
    </div>
  )
}

export default Card