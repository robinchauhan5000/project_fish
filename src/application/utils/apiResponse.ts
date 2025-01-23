class ApiResponse<T> {
  success: boolean
  message: string
  data?: T // Optional, not defaulting to null
  statusCode?: number
  error?: string // Optional, stores the actual error details

  constructor(
    success: boolean,
    message: string,
    data?: T,
    statusCode?: number,
    error?: string, // Include the actual error
  ) {
    this.success = success
    this.message = message
    if (data !== undefined) {
      this.data = data // Only assign if data is provided
    }
    this.statusCode = statusCode
    if (error) {
      this.error = error // Only include the error if provided
    }
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
    return new ApiResponse<T>(true, message, data ?? undefined, statusCode)
  }

  static errorResponse<T>({
    statusCode,
    message,
    error,
  }: {
    statusCode: number
    message: string
    error?: string // Optional, include raw error details
  }): ApiResponse<T> {
    return new ApiResponse<T>(false, message, undefined, statusCode, error) // Include error if provided
  }
}

export default ApiResponse
