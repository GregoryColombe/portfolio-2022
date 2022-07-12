export default [
  /*
  {
    name: "myCustomName",
    type: "gltfModel" || "fbxModel" || "cubeTexture" || "texture",
    path: "webgl/{folder}/{name}/{file}" || []
  }
  */

  {
    name: 'hdri',
    type: 'cubeTexture',
    path: [
      'images/hdri/px.png',
      'images/hdri/nx.png',
      'images/hdri/py.png',
      'images/hdri/ny.png',
      'images/hdri/pz.png',
      'images/hdri/nz.png'
    ]
  }
]
