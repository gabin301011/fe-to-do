interface HistoryAssignment {
  id: number,
  action: string,
  date: Date,
  assignmentId: number,
}

const defHistoryAssignment = () : HistoryAssignment => ({
  id: 0,
  action: '',
  date: new Date(),
  assignmentId: 0,
});

export {
  HistoryAssignment,
  defHistoryAssignment,
};
