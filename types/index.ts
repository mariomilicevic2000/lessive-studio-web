export interface ServiceType {
  title: string
  subtitle: string
  description: string
}

export interface PricingItemType {
  name: string
  description: string
  price: string
  unit: string
}

export interface PricingCategoryType {
  id: string
  name: string
  items: PricingItemType[]
}

export interface StatType {
  value: string
  label: string
}
