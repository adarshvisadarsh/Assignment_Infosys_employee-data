import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
} from '../actions/employeeActions';

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_EMPLOYEES_SUCCESS:
      return { ...state, loading: false, employees: action.payload };
    case FETCH_EMPLOYEES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default employeeReducer;
