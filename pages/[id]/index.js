import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import ABTest from '../../models/ABTest'
import Bar from '../../components/Bar.js'
import { mutate } from 'swr'

const embedStyle = {
  height: '100%',
  width: '100%',
};
const embedWindowStyle = {
  height: 'inherit',
  overflow: 'hidden'
};

/* Allows you to view pet card info and delete pet card*/
const ABTestPage = ({ test }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')

  const total = test.aRes + test.bRes || 1

  const handleDelete = async () => {
    const testID = router.query.id

    try {
      const res = await fetch(`/api/tests/${testID}`, {
        method: 'Put',
      })
      const { data } = await res.json()
      mutate(`/api/tests/${id}`, data, false) // Update the local data without a revalidation
      router.push('/' + testID)
    } catch (error) {
      setMessage('Failed to delete the pet.')
    }
  }

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (AB) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/tests/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({field: AB}),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/tests/${id}`, data, false) // Update the local data without a revalidation
      router.push('/'+ id)
    } catch (error) {
      setMessage('Failed to update test')
    }
  }

  return (
    <>
      <h2 className="prompt">{test.prompt}</h2>
      <div key={test._id} style={{ display: 'flex', alignItems: 'stretch' }}>
        <div className="card">
          <div style={embedWindowStyle}>
          <div className="main-content">
            <div className="btn-container">
              <button className="btn delete" onClick={() => putData('aRes')}>
                Vote A
              </button>
            </div>
            <iframe loading='lazy' sandbox='' scrolling='yes' style={embedStyle} src={test.embedA}></iframe>
          </div>
          </div>
        </div>
        <Bar total={total} num={test.aRes} color={'red'} />
        <Bar total={total} num={test.bRes} color={'blue'} />
        <div className="card">
          <div style={embedWindowStyle}>
            <div className="main-content">
              <div className="btn-container">
                <button className="btn delete" onClick={()=> putData('bRes')}>
                  Vote B
                </button>
              </div>
              <iframe loading='lazy' sandbox='' scrolling='yes' style={embedStyle} src={test.embedB}></iframe>
            </div>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
    </>
  )
}

// const PetPage = ({ pet }) => {
//   const router = useRouter()
//   const [message, setMessage] = useState('')

//   const handleDelete = async () => {
//     const petID = router.query.id

//     try {
//       await fetch(`/api/pets/${petID}`, {
//         method: 'Delete',
//       })
//       router.push('/')
//     } catch (error) {
//       setMessage('Failed to delete the pet.')
//     }
//   }

//   return (
//     <div key={pet._id}>
//       <div className="card">
//         <img src={pet.image_url} />
//         <h5 className="pet-name">{pet.name}</h5>
//         <div className="main-content">
//           <p className="pet-name">{pet.name}</p>
//           <p className="owner">Owner: {pet.owner_name}</p>

//           {/* Extra Pet Info: Likes and Dislikes */}
//           <div className="likes info">
//             <p className="label">Likes</p>
//             <ul>
//               {pet.likes.map((data, index) => (
//                 <li key={index}>{data} </li>
//               ))}
//             </ul>
//           </div>
//           <div className="dislikes info">
//             <p className="label">Dislikes</p>
//             <ul>
//               {pet.dislikes.map((data, index) => (
//                 <li key={index}>{data} </li>
//               ))}
//             </ul>
//           </div>

//           <div className="btn-container">
//             <Link href="/[id]/edit" as={`/${pet._id}/edit`} legacyBehavior>
//               <button className="btn edit">Edit</button>
//             </Link>
//             <button className="btn delete" onClick={handleDelete}>
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//       {message && <p>{message}</p>}
//     </div>
//   )
// }

export async function getServerSideProps({ params }) {
  await dbConnect()

  // const pet = await Pet.findById(params.id).lean()
  // pet._id = pet._id.toString()

  const test = await ABTest.findOne({uid: params.id}).lean()
  test._id = test._id.toString()
  //null check needed for early testing data, remove after purging atlas
  test.createdAt = test.createdAt ? test.createdAt.toString() : Date.now().toString()
  test.updatedAt = test.updatedAt ? test.updatedAt.toString() : Date.now().toString()

  return { props: { test } }
}

export default ABTestPage
