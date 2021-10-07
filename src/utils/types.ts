export type Status = 'idle' | 'pending' | 'resolved' | 'rejected' | 'canceled'
export type PartialWithMandatory<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>
