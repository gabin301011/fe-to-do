import { PriorityEnum, StatusEnum } from '../enums';

interface UpdateAssignment {
  id: number,
  name?: string,
  description?: string,
  isArchived?: boolean,
  status?: StatusEnum,
  priority?: PriorityEnum,
  completedAt?: Date,
  dateDelete?: Date,
}

const defUpdateAssignment = () : UpdateAssignment => ({
  id: 0,
  name: '',
  description: '',
  isArchived: false,
  status: StatusEnum.Default,
  priority: PriorityEnum.Default,
  completedAt: new Date(),
  dateDelete: new Date(),
});

export {
  UpdateAssignment,
  defUpdateAssignment,
};
