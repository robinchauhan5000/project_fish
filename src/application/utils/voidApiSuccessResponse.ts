class VoidApiResponse {
  success: boolean
  message: string
  statusCode?: number
  error?: string

  constructor({
    message,
    success,
    statusCode,
    error,
  }: {
    success: boolean
    message: string
    statusCode?: number
    error?: string
  }) {
    this.success = success
    this.message = message
    this.statusCode = statusCode
    this.error = error
  }
}

export default VoidApiResponse
