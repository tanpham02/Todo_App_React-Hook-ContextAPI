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
        resultSearchs: [],
        filterByPriority: [],
        filterByStatus: [],
        status: {
            All: 'all',
            Completed: 'completed',
            Todo: 'todo',
        },
    }
}


function todoAppReducer(state, action) {
    switch (action.type) {
        case ADD_TODO: {

            return {
                ...state,
                todoLists: [...state.todoLists, action.payload]
            }
        }

        case IS_COMPLETED: {
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
        }

        case SEARCH_TODO: {
            const results = state.todoLists.filter(todo => todo.name.toLowerCase().includes(action.payload.toLowerCase()))
            if (results.length) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        resultSearchs: [...results]
                    }
                }
            }

            return {
                ...state,
                filters: {
                    ...state.filters,
                    resultSearchs: []
                }
            }
        }

        case FILTER_BY_PRIORITY: {
            const outputFilter = state.todoLists.filter(todo => action.payload.includes(todo.priority))
            if (outputFilter.length) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        filterByPriority: [...outputFilter]
                    },
                }
            }
            return {
                ...state,
                filters: {
                    ...state.filters,
                    filterByPriority: []
                },
            }
        }

        case FILTER_BY_STATUS: {
            if (state.filters.status[action.payload] === 'all') {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        filterByStatus: [...state.todoLists]
                    },
                }
            } else if (state.filters.status[action.payload] === 'completed') {
                const completed = state.todoLists.filter(todo => todo.isCompleted)
                if (completed.length) {
                    return {
                        ...state,
                        filters: {
                            ...state.filters,
                            filterByStatus: [...completed]
                        },
                    }
                } else {
                    return {
                        ...state,
                        filters: {
                            ...state.filters,
                            filterByStatus: []
                        },
                    }
                }
            } else if (state.filters.status[action.payload] === 'todo') {
                const todos = state.todoLists.filter(todo => !todo.isCompleted)
                if (todos.length) {
                    return {
                        ...state,
                        filters: {
                            ...state.filters,
                            filterByStatus: [...todos]
                        },
                    }
                } else {
                    return {
                        ...state,
                        filters: {
                            ...state.filters,
                            filterByStatus: []
                        },
                    }
                }
            }
            return {
                ...state,
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