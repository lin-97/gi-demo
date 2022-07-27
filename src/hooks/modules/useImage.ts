import { api as viewerApi } from 'v-viewer'
import 'viewerjs/dist/viewer.css'

export default function useImage() {
  function previewImage(src: string) {
    viewerApi({
      images: [src]
    })
  }

  return {
    previewImage
  }
}
