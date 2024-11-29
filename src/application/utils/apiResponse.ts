class ApiResponse<T> {
  success: boolean
  message: string
  data: T | null
  error: string | null

  constructor(success: boolean, message: string, data: T | null = null, error: string | null = null) {
    this.success = success
    this.message = message
    this.data = data
    this.error = error
  }

  static successResponse<T>(data: T, message = "Success"): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data, null)
  }

  static errorResponse<T>(error: string, message = "Error", data: T | null = null): ApiResponse<T> {
    return new ApiResponse<T>(false, message, data, error)
  }
}
