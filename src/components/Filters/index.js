import {
  Col,
  Row,
  Input,
  Typography,
  Radio,
  Select,
  Tag
} from 'antd'
import {
  useContext,
  useEffect,
  useState
} from 'react'
import { TodoAppContext } from '../../Context/TodoAppContext'
import {
  searchTodo,
  filterByPriority,
  filterByStatus
} from '../../Reducers/actions'
import { priorities } from '../TodoList/index'

export default function Filters() {
  const [todoState, dispatch] = useContext(TodoAppContext)
  const [valueSearch, setValueSearch] = useState('')
  const { Search } = Input
  const { Option } = Select
  const { filters } = todoState
  const { status } = filters


  useEffect(() => {
    dispatch(searchTodo(valueSearch))
  }, [valueSearch])


  const handleFilterByPriority = value => {
    dispatch(filterByPriority(value))
  }

  const handleFilterByStatus = e => {
    dispatch(filterByStatus(e.target.value))
  }



  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search
          placeholder='Input search text'
          value={valueSearch}
          onChange={e => setValueSearch(e.target.value)}
        />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group
          onChange={handleFilterByStatus}
          value={status}
        >
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
          onChange={handleFilterByPriority}
        >
          {priorities.map((prio, index) => (
            <Option key={index} value={prio.name} label={prio.name}>
              <Tag color={prio.color}>{prio.name}</Tag>
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}
