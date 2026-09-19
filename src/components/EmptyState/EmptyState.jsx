import styles from './EmptyState.module.css'

function EmptyState({
  icon = '📭',
  title = 'Нет данных',
  description = 'Здесь пока ничего нет.',
  actionLabel = '',
  onAction = null,
}) {
  const showAction = actionLabel && typeof onAction === 'function'

  return (
    <div className={styles.emptyState}>
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      {showAction && (
        <button
          className={styles.actionButton}
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
