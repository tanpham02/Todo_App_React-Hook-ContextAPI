import { Col, Row, Input, Button, Select, Tag } from 'antd'
import Todo from '../Todo'
import { useContext, useRef, useState, useEffect } from 'react'
import { TodoAppContext } from '../../Context/TodoAppContext'
import { todoValue, addTodo } from '../../Reducers/actions'

export const priorities = [
  {
    name: 'High',
    color: 'red'
  },
  {
    name: 'Medium',
    color: 'blue'
  },
  {
    name: 'Low',
    color: 'gray'
  },
]

export default function TodoList() {
  const [todoState, dispatch] = useContext(TodoAppContext)
  let {
    todoLists,
    filters
  } = todoState
  const {
    search,
    status,
    priorities
  } = filters

  const [valuePrio, setValuePrio] = useState('Medium')
  const [todoName, setTodoName] = useState('')
  const inputRef = useRef()
  const { Option } = Select
  const { Group } = Input
  const [output, setOutput] = useState([])


  const handleAddTodo = () => {
    dispatch(addTodo({
      name: todoName,
      priority: valuePrio,
      isCompleted: false
    }))
    setTodoName('')
    setValuePrio('Medium')
    inputRef.current.focus()
  }

  useEffect(() => {
    const outputSearch = todoLists.filter(todo => todo.name.toLowerCase().includes(search.toLowerCase()))
    if (outputSearch.length) {
      setOutput(outputSearch)
    }
  }, [search])

  useEffect(() => {
    const outputStatus = todoLists.filter(todo => {
      if (status === 'All') {
        return todo
      } else if (status === 'Completed') {
        return todo.isCompleted
      } else if (status === 'Todo') {
        return !todo.isCompleted
      }
    })
    if (outputStatus.length) {
      setOutput(outputStatus)
      return
    }
    setOutput(todoLists)
  }, [status])

  useEffect(() => {
    const outputPriority = todoLists.filter(todo => priorities.includes(todo.priority))
    if (outputPriority.length) {
      setOutput(outputPriority)
      return
    }
    setOutput(todoLists)
  }, [priorities])

  useEffect(() => {
    setOutput(todoLists)
  }, [todoLists])


  useEffect(() => {
    localStorage.setItem('todoStorages', JSON.stringify(todoLists))
  }, [todoLists])


  return (
    <Row style={{ height: 'calc(100% - 40px)', display: 'block', position: 'relative' }}>
      <Todo todoLists={output} />

      <Col span={24}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Group style={{ display: 'flex' }} compact>
          <Input
            ref={inputRef}
            value={todoName}
            onChange={e => setTodoName(e.target.value)}
          />

          <Select
            defaultValue="Medium"
            onChange={value => setValuePrio(value)}
            value={valuePrio}
          >
            <Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Option>
            <Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Option>
            <Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Option>
          </Select>

          <Button
            type='primary'
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </Group>
      </Col>
    </Row >
  )
}
