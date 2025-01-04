import ApiResponse from "./apiResponse"

abstract class GenericUsecase<P, T> {
  abstract execute(request: P): Promise<ApiResponse<T>>
}
export default GenericUsecase
