
type DataResponseEntity<T> = {
  message?: string
  code?: number
} & T

type DtoHttpResponse<T> = {
  code: number
  message: string
} & Omit<DataResponseEntity<T>, 'message' | 'code'>

class HttpResponse {
  /**
   * Base Response
   * @param dataResponse
   * @returns
   */
  private static baseResponse<T>(
    dataResponse: DataResponseEntity<T>
  ): DtoHttpResponse<T> {
    const {
      message = 'data has been received',
      code = 200,
      ...rest
    } = dataResponse

    return { code, message, ...rest }
  }

  /**
   * Response Get or Sucess
   * @param dataResponse
   * @param options
   * @returns
   */
  public static get<T>(
    dataResponse: DataResponseEntity<T>,
  ): DtoHttpResponse<T> {
    const message = 'success.data_received'

    return this.baseResponse({ message, ...dataResponse })
  }

  /**
   * Response Created
   * @param dataResponse
   * @param options
   * @returns
   */
  public static created<T>(
    dataResponse: DataResponseEntity<T>,
  ): DtoHttpResponse<T> {
    const message = 'success.data_added'

    return this.baseResponse({ code: 201, message, ...dataResponse })
  }

  /**
   * Response Updated
   * @param dataResponse
   * @param options
   * @returns
   */
  public static updated<T>(
    dataResponse: DataResponseEntity<T>,
  ): DtoHttpResponse<T> {
    const message = 'success.data_updated'

    return this.baseResponse({ message, ...dataResponse })
  }

  /**
   * Response Deleted
   * @param dataResponse
   * @param options
   * @returns
   */
  public static deleted<T>(
    dataResponse: DataResponseEntity<T>,
  ): DtoHttpResponse<T> {
    const message = 'success.data_deleted'

    return this.baseResponse({ message, ...dataResponse })
  }
}

export default HttpResponse