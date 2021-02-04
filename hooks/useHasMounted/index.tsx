import { useState, useEffect } from 'react'

/**
 * Handles the mounted state of the component.
 *
 * Useful for cases where a content should only be rendered on the browser
 * and the DOM should stay the same on the server and on the re-hydration process.
 */
export function useHasMounted () {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return { hasMounted }
}
