import { createContext, useReducer } from "react"
import todoAppReducer, { initState } from '../Reducers/reducer'

const TodoAppContext = createContext()

function TodoAppProvider({ children }) {
    const [todoState, dispatch] = useReducer(todoAppReducer, initState)
    const { Provider } = TodoAppContext


    return (

        <Provider value={[todoState, dispatch]}>
            {children}
        </Provider>
    )
}

export default TodoAppProvider
export { TodoAppContext }