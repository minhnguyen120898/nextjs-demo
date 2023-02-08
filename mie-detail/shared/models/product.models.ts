
export interface ProductModel {
  id: string,
  created_at: number,
  eye_catching: string,
  title: string,
  tags: TagModel[],
  category: CategoryModel[]
}

export interface TagModel {
  id: string,
  title: string
}

export interface CategoryModel {
  id: string,
  image: string,
  parent?: string[],
  title: string
}