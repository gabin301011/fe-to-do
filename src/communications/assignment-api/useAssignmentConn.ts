import axios from 'axios';
import { StatusEnum } from './enums';
import { AddAssignment, AddHistoryAssignment, UpdateAssignment } from './send-models';

export function useAssignmentConn() {
  async function addHistoryAssignmentAsync(addHistoryAssignemnt: AddHistoryAssignment) {
    const result = await axios.post('https://localhost:7029/api/history-assignment/v1/add', addHistoryAssignemnt);
    return result;
  }

  async function addAssignmentAsync(addAssignment: AddAssignment) {
    const result = await axios.post('https://localhost:7029/api/assignment/v1/add', addAssignment);
    return result;
  }

  async function updateAssignmentAsync(updateAssignment: UpdateAssignment) {
    const result = await axios.put('https://localhost:7029/api/assignment/v1/update', updateAssignment);
    return result || '';
  }

  async function deleteAssignmentAsync(id: number) {
    const result = await axios.delete(`https://localhost:7029/api/assignment/v1/delete/${id}`);
    return result || '';
  }

  async function getByStatusAsync(status: StatusEnum) {
    const result = await axios.get(`https://localhost:7029/api/assignment/v1/get/${status}`);
    return result || [];
  }

  async function getAllArchivedAsync() {
    const result = await axios.get('https://localhost:7029/api/assignment/v1/archived');
    return result || [];
  }

  async function getByIdAsync(id: number) {
    const result = await axios.get(`https://localhost:7029/api/assignment/v1/get-by-id/${id}`);
    return result || {};
  }

  async function getHistoryAssignmentByIdAsync(assignmentId: number) {
    const result = await axios.get(`https://localhost:7029/api/history-assignment/v1/get-by-assignment-id/${assignmentId}`);
    return result || [];
  }

  return {
    addAssignmentAsync,
    updateAssignmentAsync,
    deleteAssignmentAsync,
    getByStatusAsync,
    addHistoryAssignmentAsync,
    getByIdAsync,
    getHistoryAssignmentByIdAsync,
    getAllArchivedAsync,
  };
}
