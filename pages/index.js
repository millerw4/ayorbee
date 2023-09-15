import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import { useRouter } from 'next/router'
import ABTest from '../models/ABTest'
import NewTest from '../pages/new'

const Index = ({ tests }) => {
  const handleClick = (e) => {
    router.push('/' + e.target.name)
  }
    return (
      <>
        <NewTest />
        <ul>
          {tests.map( test => (
            <li key={test.uid} >
              <Link href={`/${test.uid}`}>
                {`${test.uid}/${test.prompt}`}
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

/* Retrieves test data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  const resultTest = await ABTest.find({})
  const tests = resultTest.map((doc) => {
    const test = doc.toObject()
    test._id = test._id.toString()

    //null check needed for early testing data, remove after purging atlas
    test.createdAt = test.createdAt ? test.createdAt.toString() : Date.now().toString()
    test.updatedAt = test.updatedAt ? test.updatedAt.toString() : Date.now().toString()
    return test
  })

  return { props: { tests: tests } }
}

export default Index