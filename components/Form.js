import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({ formId, testForm, forNewPet = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    uid: testForm.uid,
    prompt: testForm.prompt,
    embedA: testForm.embedA,
    embedB: testForm.embedB,
    aRes: testForm.aRes,
    bRes: testForm.bRes,
  })


  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/tests/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update test')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      console.log('res?', res)
      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }
      console.log('form uid', form.uid)
      router.push('/' + form.uid)
    } catch (error) {
      setMessage('Failed to add test')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value
    console.log('field name:', name)
    console.log('field value:', value)

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.prompt) err.prompt = 'Prompt is required'
    if (form.embedA === '') err.embedA = 'Embed link A is required'
    if (form.embedB === '') err.embedB = 'Embed link B is required'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewPet ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt</label>
        <input
          type="text"
          maxLength="200"
          name="prompt"
          value={form.prompt}
          onChange={handleChange}
          required
        />

        <label htmlFor="embedA">Embed Link A</label>
        <input
          type="text"
          maxLength="200"
          name="embedA"
          value={form.embedA}
          onChange={handleChange}
          required
        />

        <label htmlFor="embedB">Embed Link B</label>
        <input
          type="text"
          maxLength="200"
          name="embedB"
          value={form.embedB}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form
