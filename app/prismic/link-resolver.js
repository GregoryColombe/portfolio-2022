export default function linkResolver (doc) {
  if (doc.type === 'page' && doc.uid === 'home') {
    return '/'
  }

  // Let Route Resolver handle all other routes.
  return null
}
