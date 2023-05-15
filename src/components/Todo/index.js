import { Tag, Checkbox } from 'antd'
import { useState, useContext, useEffect, useRef } from 'react'
import { isCompleted } from '../../Reducers/actions'
import { TodoAppContext } from '../../Context/TodoAppContext'
import './index.css'

const priorityColor = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
}

export default function Todo({ todoLists }) {
  const [checked, setChecked] = useState([])
  const [, dispatch] = useContext(TodoAppContext)
  const todosRef = useRef()

  const toggleCheckbox = (index) => {
    const removeCheck = checked.includes(index)
    setChecked(prev => {
      if (removeCheck) {
        return checked.filter(check => check !== index)
      } else {
        return [...prev, index]
      }
    })
  }


  useEffect(() => {
    dispatch(isCompleted(checked))
  }, [checked])



  useEffect(() => {
    if (todosRef.current.clientHeight > 190) {
      todosRef.current.style.overflowY = 'scroll'
    }
  }, [])


  return (
    <div
      ref={todosRef}
      style={{
        marginBottom: 3,
        maxHeight: 190,
        overflowY: 'auto',
        paddingRight: 8
      }}
      className='list-todos'
    >
      {todoLists?.map((todo, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '6px',
            ...(todo.isCompleted ? { opacity: 0.5, textDecoration: 'line-through' } : {})
          }}
        >
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => toggleCheckbox(index)}
          >
            {todo.name}
          </Checkbox>
          <Tag color={priorityColor[todo.priority]} style={{ margin: 0 }}>
            {todo.priority}
          </Tag>
        </div>
      ))
      }
    </ div>
  )
}
