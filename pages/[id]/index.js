import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import ABTest from '../../models/ABTest'
import Bar from '../../components/Bar.js'
import Card from '../../components/Card.js'

/* Allows you to view pet card info and delete pet card*/
const ABTestPage = ({ test }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [hasVoted, setHasVoted] = useState(false)

  const total = test.aRes + test.bRes || 1

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (AB) => {
    if (hasVoted) {
      setMessage('Already voted!')
      return
    } else {
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
        } else {
          setHasVoted(true)
        }
        const { data } = await res.json()
        mutate(`/api/tests/${id}`, data, false) // Update the local data without a revalidation
        router.push('/'+ id)
      } catch (error) {
        setMessage('Failed to update test')
      }
    }
  }

  return (
    <>
      <h2 className="prompt">{test.prompt}</h2>
      <div key={test._id} style={{ display: 'flex', alignItems: 'stretch' }}>
        <Card embedLink={test.embedA} handleVote={() => putData('aRes')} />
        <Bar total={total} num={test.aRes} color={'red'} />
        <Bar total={total} num={test.bRes} color={'blue'} />
        <Card embedLink={test.embedB} handleVote={() => putData('bRes')} />
        {message && <p>{message}</p>}
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()
  const test = await ABTest.findOne({uid: params.id}).lean()
  test._id = test._id.toString()
  //null check needed for early testing data, remove after purging atlas
  test.createdAt = test.createdAt ? test.createdAt.toString() : Date.now().toString()
  test.updatedAt = test.updatedAt ? test.updatedAt.toString() : Date.now().toString()

  return { props: { test } }
}

export default ABTestPage
