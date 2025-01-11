import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchEmployeesSuccess, fetchEmployeesFailure, FETCH_EMPLOYEES_REQUEST } from '../actions/employeeActions';

function fetchEmployeesAPI() {
    return axios.get('https://dummyjson.com/users'); // Dummy API
  //return axios.get('http://localhost:5000/api/users'); // My own server
}

function* fetchEmployeesSaga() {
  try {
    const response = yield call(fetchEmployeesAPI);
    yield put(fetchEmployeesSuccess(response.data.users));
  } catch (error) {
    yield put(fetchEmployeesFailure(error.message));
  }
}

export default function* employeeSaga() {
  yield takeLatest(FETCH_EMPLOYEES_REQUEST, fetchEmployeesSaga);
}
