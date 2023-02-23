import { PriorityEnum } from '../enums';

interface AddAssignment {
  name: string,
  description?: string,
  priority: PriorityEnum,
}

const defAddAssignment = () : AddAssignment => ({
  name: '',
  description: '',
  priority: PriorityEnum.Default,
});

export {
  AddAssignment,
  defAddAssignment,
};
