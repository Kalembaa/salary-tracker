import { useEffect } from 'react'
import styles from './Modal.module.css'

function Modal({ isOpen = false, onClose = () => {}, children = null }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose?.()
  }

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => onClose?.()}
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
