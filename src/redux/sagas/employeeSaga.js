import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchEmployeesSuccess, fetchEmployeesFailure, FETCH_EMPLOYEES_REQUEST } from '../actions/employeeActions';
import apiRequest from '../../utils/apiHelper'; 
import apiUrls from '../../utils/apiUrls'; 

// function fetchEmployeesAPI() {
//     //return axios.get('https://dummyjson.com/users'); // Dummy API
//   //return axios.get('http://localhost:5000/api/users'); // My own server
//   return axios.get('http://localhost:5000/api/users'); // deploy server 
// }

function* fetchEmployeesSaga() {
  try {
    const data = yield call(apiRequest, { url: apiUrls.getEmployees, method: 'GET' });
    console.log("API Response:", data);
    yield put(fetchEmployeesSuccess(data.users));
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    yield put(fetchEmployeesFailure(error.message || 'Failed to fetch employees'));
  }
}

export default function* employeeSaga() {
  yield takeLatest(FETCH_EMPLOYEES_REQUEST, fetchEmployeesSaga);
}
