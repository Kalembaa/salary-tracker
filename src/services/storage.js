export function getStorageItem(key, fallback = []) {
  try {
    const storedValue = localStorage.getItem(key)

    if (!storedValue) {
      return fallback
    }

    return JSON.parse(storedValue)
  } catch (error) {
    console.error(`Ошибка чтения localStorage: ${key}`, error)
    return fallback
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Ошибка записи localStorage: ${key}`, error)
    return false
  }
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Ошибка удаления localStorage: ${key}`, error)
    return false
  }
}

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}
