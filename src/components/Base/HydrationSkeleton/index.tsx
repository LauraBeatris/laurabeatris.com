import { Skeleton, SkeletonProps } from '@chakra-ui/react'

import { useHasMounted } from 'hooks/useHasMounted'

export function HydrationSkeleton ({ children, ...rest }: SkeletonProps) {
  const { hasMounted } = useHasMounted()

  return (
    <Skeleton {...rest} isLoaded={hasMounted}>
      {children}
    </Skeleton>
  )
}
