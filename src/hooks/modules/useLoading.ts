import { ref } from 'vue'

export default function useLoading(initValue = false) {
  const loading = ref<boolean>(initValue)

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const toggle = () => {
    loading.value = !loading.value
  }

  return {
    loading,
    setLoading,
    toggle
  }
}
