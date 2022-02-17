import sanityClient from '@sanity/client'

export const client = new sanityClient({
  projectId: 'hu38dqtw',
  dataset: 'production',
  apiVersion: '2022-02-16',
  token:
    'skhLoOmV2mr1olfHNi1ssCSopfNfiGqJAJTUUQozmlUkGRikEKwl4ZTrRkHDju4UFZs5KEsiYNvhSninr24okVtNykvGzsedgrbhW6ZY5nCZsK0hxY774G1XFPZmi1uClyOCoMqFuYOfcGX09ZjN21UPiE5A7MbiXj1O5ANxfenX1PKi2DY2',
  useCdn: false,
})
/* PROJECT ID ES EL QUE APARECE EN EL INICIO */
/* TOKEN OBTENIDO EN SANITY, EN EL APARTADO DE API, HASTA ABAJO */