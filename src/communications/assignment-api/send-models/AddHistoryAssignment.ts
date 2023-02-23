interface AddHistoryAssignment {
  action: string,
  assignmentId: number,
}

const defAddHistoryAssignment = () : AddHistoryAssignment => ({
  action: '',
  assignmentId: 0,
});

export {
  AddHistoryAssignment,
  defAddHistoryAssignment,
};
