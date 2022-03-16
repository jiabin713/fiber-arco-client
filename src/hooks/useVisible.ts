import { ref } from 'vue';

export default function useVisible(initValue = false) {
  const visible = ref(initValue);
  const setVisible = (value: boolean) => {
    visible.value = value;
  };
  return {
    visible,
    setVisible,
  };
}
