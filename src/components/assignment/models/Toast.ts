import { ToastEnum } from '../enums';

interface Toast {
  id: number,
  name: string,
  from: string,
  to: string,
  status: ToastEnum,
}

const defToast = () : Toast => ({
  id: 0,
  name: '',
  from: '',
  to: '',
  status: ToastEnum.Default,
});

export {
  Toast,
  defToast,
};
