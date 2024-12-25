export interface ErrorResult<T> {
  Err: T
}

export interface OkResult<T> {
  Ok: T
}

export type ApiResult = Error | Object
