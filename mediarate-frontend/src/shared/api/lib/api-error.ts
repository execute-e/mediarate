export interface ApiErrorShape {
  statusCode: number;
  message: string | string[];
  error: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public data: ApiErrorShape,
  ) {
    super(Array.isArray(data.message) ? data.message.join(", ") : data.message);
  }

  static async from(response: Response): Promise<ApiError> {
    const data = await response.json().catch(
      (): ApiErrorShape => ({
        statusCode: response.status,
        message: response.statusText,
        error: "Unknown",
      }),
    );
    return new ApiError(response.status, data);
  }
}
