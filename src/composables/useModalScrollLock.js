import { watch, onUnmounted } from 'vue'

const MODAL_CLASS = 'modal-open'

export function lockModalScroll() {
  document.documentElement.classList.add(MODAL_CLASS)
}

export function unlockModalScroll() {
  document.documentElement.classList.remove(MODAL_CLASS)
}

export function useModalScrollLock(isOpen) {
  watch(isOpen, (open) => {
    if (open) lockModalScroll()
    else unlockModalScroll()
  })

  onUnmounted(() => {
    if (isOpen.value) unlockModalScroll()
  })
}
