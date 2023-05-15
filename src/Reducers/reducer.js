import {
    ADD_TODO,
    IS_COMPLETED,
    SEARCH_TODO,
    FILTER_BY_PRIORITY,
    FILTER_BY_STATUS
} from './actions'

const initState = {
    todoLists: JSON.parse(localStorage.getItem('todoStorages')) ?? [],
    filters: {
        search: '',
        priorities: [],
        status: 'All',
    }
}


function todoAppReducer(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todoLists: [...state.todoLists, action.payload]
            }


        case IS_COMPLETED:
            state.todoLists.filter((todo, index) => {
                if (action.payload.includes(index)) {
                    todo.isCompleted = true
                    return {
                        ...state,
                        todoLists: [...state.todoLists]
                    }

                } else {
                    todo.isCompleted = false
                    return {
                        ...state,
                        todoLists: [...state.todoLists]
                    }
                }
            })
            return {
                ...state
            }


        case SEARCH_TODO:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    search: action.payload
                }
            }


        case FILTER_BY_PRIORITY:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    priorities: [...action.payload]
                },
            }


        case FILTER_BY_STATUS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    status: action.payload
                }
            }

        default:
            return {
                ...state
            }
    }
}

export default todoAppReducer
export { initState }