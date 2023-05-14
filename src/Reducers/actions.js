const ADD_TODO = 'addTodo'
const IS_COMPLETED = 'isCompleted'
const SEARCH_TODO = 'searchTodo'
const FILTER_BY_PRIORITY = 'filterByPriority'
const FILTER_BY_STATUS = 'filterByStatus'

const addTodo = payload => {
    return {
        type: ADD_TODO,
        payload
    }
}

const isCompleted = payload => {
    return {
        type: IS_COMPLETED,
        payload
    }
}

const searchTodo = payload => {
    return {
        type: SEARCH_TODO,
        payload
    }
}

const filterByPriority = payload => {
    return {
        type: FILTER_BY_PRIORITY,
        payload
    }
}

const filterByStatus = payload => {
    return {
        type: FILTER_BY_STATUS,
        payload
    }
}

export {
    ADD_TODO,
    IS_COMPLETED,
    SEARCH_TODO,
    FILTER_BY_PRIORITY,
    FILTER_BY_STATUS,
    addTodo,
    isCompleted,
    searchTodo,
    filterByPriority,
    filterByStatus,
}