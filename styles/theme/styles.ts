export const styles = {
  global: {
    body: {
      color: 'var(--text-color)',
      backgroundColor: 'var(--bg-color)'
    },
    '*::placeholder': {
      color: 'var(--placeholder-text-color)'
    },
    '*, *::before, &::after': {
      borderColor: 'var(--border-color)'
    }
  }
}
