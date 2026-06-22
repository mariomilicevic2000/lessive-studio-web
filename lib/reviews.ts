export interface Review {
  author: string
  location: string
  rating: number
  quote: string
}

export interface ReviewAggregate {
  /** Average rating rounded to one decimal, e.g. 4.8 */
  value: number
  /** Number of reviews */
  count: number
  best: number
  worst: number
}

export function computeAggregate(reviews: Review[]): ReviewAggregate {
  const count = reviews.length
  const sum = reviews.reduce((total, r) => total + r.rating, 0)
  const value = count > 0 ? Math.round((sum / count) * 10) / 10 : 0
  return { value, count, best: 5, worst: 1 }
}
