export interface Kustomization {
  images?: Image[]
}

export interface Image {
  name: string
  newName?: string
  newTag?: string
}
