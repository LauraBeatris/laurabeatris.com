import { links } from './links'

const { blog } = links

export const navigationItems = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Talks',
    href: '/talks'
  },
  {
    name: 'Learning Journal',
    href: '/learning-journal'
  },
  {
    name: 'Blog',
    href: blog.href,
    isExternal: true
  }
]
