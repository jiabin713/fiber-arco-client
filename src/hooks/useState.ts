import { UnwrapRef, ref } from 'vue';

import { set } from '@vueuse/core';

export default function useState<T>(initValue: T) {
  const state = ref(initValue);
  const setState = (value: UnwrapRef<T>) => set(state, value);
  return {
    state,
    setState,
  };
}
