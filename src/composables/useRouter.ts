import { getCurrentInstance } from '@vue/composition-api';

export function useRouter() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error('must be called in setup');
  vm.proxy.$router.go(1);
  return vm.proxy.$router;
}
