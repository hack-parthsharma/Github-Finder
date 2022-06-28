import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
  const githubContext = useContext(GithubContext)
  const alertContext = useContext(AlertContext)
  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (text === '') {
      alertContext.setAlert('Please enter something', 'light')
    } else {
      githubContext.searchUsers(text)
      setText('')
    }
  }

  const onChange = e => setText(e.target.value)

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}>
          Clear
        </button>
      )}
    </div>
  )
}

export default Search

// form needs and onChange handler or it is read only by default ie you can't type anything inside
// we will always have component level state for forms even if we are using context or redux
// [e.target.name] will let us set the state for any active target so we don't need to set 'name', 'email', etc ...
