import Link from 'next/link'
// import dbConnect from '../lib/dbConnect'
import { useRouter } from 'next/router'
// import ABTest from '../models/ABTest'
import NewTest from '../pages/new'

const Index = ({ tests }) => {
    return (
      <>
        <h2>Welcome to ayor🐝!</h2>
        <h3>To create a simple A/B test, copy and past 2 publicly available links that you would like to compare.</h3>
        <h3>This works best with a google doc that has been shared to the web via the share/publish feature.</h3>
        <h3 style={{color: 'red'}}>Note: Please remove any personally identifying information from documents that you upload</h3>
        <h3>Optionally, change the prompt to something else.</h3>
        <h3>Hit 'submit' when you're ready, then copy the url and send it to others for a quick opinion.</h3>
        <h3>Each test and all of its data are deleted automatically after three days.</h3>
        <NewTest />
        {/* <ul>
          {tests.map( test => (
            <li key={test.uid} >
              <Link href={`/${test.uid}`}>
                {`${test.uid}/${test.prompt}`}
              </Link>
            </li>
          ))}
        </ul> */}
      </>
    )
  }

/* Retrieves test data from mongodb database */
// export async function getServerSideProps() {
//   await dbConnect()

//   const resultTest = await ABTest.find({})
//   const tests = resultTest.map((doc) => {
//     const test = doc.toObject()
//     test._id = test._id.toString()

//     //null check needed for early testing data, remove after purging atlas
//     test.createdAt = test.createdAt ? test.createdAt.toString() : Date.now().toString()
//     test.updatedAt = test.updatedAt ? test.updatedAt.toString() : Date.now().toString()
//     return test
//   })

//   return { props: { tests: tests } }
// }

export default Index