class ApiResponse<T> {
  success: boolean
  message: string
  data?: T // Optional, not defaulting to null
  statusCode?: number

  constructor(success: boolean, message: string, data?: T, statusCode?: number) {
    this.success = success
    this.message = message
    if (data !== undefined) {
      this.data = data // Only assign if data is provided
    }
    this.statusCode = statusCode
  }

  static successResponse<T>({
    data,
    message,
    statusCode,
  }: {
    data?: T
    message: string
    statusCode: number
  }): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data?? undefined, statusCode)
  }

  static errorResponse<T>({ statusCode, message }: { statusCode: number; message: string }): ApiResponse<T> {
    return new ApiResponse<T>(false, message, undefined, statusCode) // No data provided
  }
}

export default ApiResponse
