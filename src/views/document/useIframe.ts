import { ref, onMounted } from 'vue'

export default function useIframe() {
  const loading = ref(true)

  onMounted(() => {
    const iframe: any = document.querySelector('#iframe')
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', function () {
        loading.value = false
      })
    } else {
      iframe.onload = function () {
        loading.value = false
      }
    }
  })

  return {
    loading
  }
}
