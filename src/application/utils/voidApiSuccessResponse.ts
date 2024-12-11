class VoidApiResponse {
  success: boolean
  message: string
  statusCode?: number

  constructor({message,success,statusCode}:{success: boolean, message: string, statusCode?: number}) {
    this.success = success
    this.message = message
    this.statusCode = statusCode
  }
}

export default VoidApiResponse
