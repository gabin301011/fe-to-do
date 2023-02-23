import { PriorityEnum, StatusEnum } from '../enums';

interface Assignment {
  id: number,
  name: string,
  description?: string,
  isArchived: boolean,
  status: StatusEnum,
  priority: PriorityEnum,
  createdAt: Date,
  completedAt: Date,
  dateDelete: Date,
}

const defAssignment = () : Assignment => ({
  id: 0,
  name: '',
  description: '',
  isArchived: false,
  status: StatusEnum.Default,
  priority: PriorityEnum.Default,
  createdAt: new Date(),
  completedAt: new Date(),
  dateDelete: new Date(),
});

export {
  Assignment,
  defAssignment,
};
