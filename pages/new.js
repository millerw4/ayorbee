import Form from '../components/Form'

const NewTest = () => {
  const setId = () => {
    const length = 5;
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let id = '';
    for(let i = 0; i < length; i++) {
      id += alpha[Math.floor(Math.random() * alpha.length)];
    }
    return id
  }

  const testForm = {
    uid: setId(),
    prompt: 'Which is better?',
    embedA: '',
    embedB: '',
    aRes: 0,
    bRes: 0,
  }

  return <Form formId="add-test-form" testForm={testForm} />
}

export default NewTest