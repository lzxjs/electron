import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

const FileSearch = ({ title, onFileSearch }) => {
  const [ inputActive, setInputActive ] = useState(false)
  const [ value, setValue ] = useState('')
  let node = useRef(null)

  const closeSearch = (e) => {
    e.preventDefault()
    setInputActive(false)
    setValue('')
  }
  useEffect(() => {
    const handleInputEvent = (event) => {
      const { keyCode } = event
      if (keyCode === 13 && inputActive) {
        onFileSearch(value)
      }else if (keyCode === 27 && inputActive) {
        closeSearch(event)
      }
    }
    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
    }
  })

  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  }, [inputActive])
  return (
    <div className='alert aleart-primary'>
      { !inputActive &&
        <div className='d-flex justify-content-between align-items-center'>
          <span>{ title }</span>
          <button
            type='button'
            className='icon-button'
            onClick={ () => { setInputActive(true) } }
          >
            <FontAwesomeIcon 
              icon={faSearch} 
              size='lg'
              title='搜索'
            />
          </button>
        </div>
      }
      { inputActive &&
        <div className='d-flex justify-content-between align-items-center'>
          <input 
            className='form-control'
            value={ value }
            ref={ node }
            onChange={ (e) => { setValue(e.target.value) } }
          />
          <button
            type='button'
            className='icon-button'
            onClick={ closeSearch }
          >
            <FontAwesomeIcon 
              icon={faTimes} 
              size='lg'
              title='关闭'
            />
          </button>
        </div>
      }
    </div>
  )
}

export default FileSearch