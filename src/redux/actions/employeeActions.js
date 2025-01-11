export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';

export const fetchEmployeesRequest = () => ({ type: FETCH_EMPLOYEES_REQUEST });
export const fetchEmployeesSuccess = (employees) => ({ type: FETCH_EMPLOYEES_SUCCESS, payload: employees });
export const fetchEmployeesFailure = (error) => ({ type: FETCH_EMPLOYEES_FAILURE, payload: error });
