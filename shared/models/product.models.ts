
export interface ProductModel {
  id: string,
  status: number, // 0 public, 1 private
  eye_catching: string,
  title: string,
  description: string,
  tags: TagModel[],
  category: CategoryModel[],
  meta_title: string,
  meta_description: string,
  video: string,
  social: SocialModel,
  youtobe_url: string,
  //---
  content_id: string,
  spot_name: string,
  explanatory_text: string,
  url: string,
  zip_code: string,
  address: string,
  phone: string,
  utilization_time: string,
  holiday: string,
  fee: string,
  parking: string,
  remark: string,
  stay_time: string,
  lat: number,
  lng: number,
  category1: string,
  image: string[],
  is_featured: boolean,
  time_start: number,
  time_end: number,
  created_at: number,
  updated_at: number,
}

export interface SocialModel {
  facebook?: string,
  instagram?: string,
  twitter?: string
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