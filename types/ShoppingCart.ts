export type ItemCart<T> = {
    id: string,
    description?: string,
    price: number,
    quantity: number,
    pq_id?: number,
    data?: T
}