export interface GResponse {
  responseType: string;
  result: any[];
  error: ApplicationError[];
}

export class ApplicationError {
  public type?: string;
  public message?: string | object;
  constructor(type: string, 
      message: string | object) {
        this.type = type;
        this.message = message;
  }
}

export class ApplicationResponse implements GResponse {
  responseType = 'success';
  error = [];
  result: any[] = [];

  constructor(result: any[]) {
    this.result = result;
  }
}

export class ErrorResponse implements GResponse {
  responseType = 'error';
  error: any[] = [];
  result = [];

  constructor(error: any[]) {
    this.error = error;
  }
}


export class HTTP400Error extends Error implements GResponse {
    responseType = 'error';
    result = [];
    error: ApplicationError[];

    constructor(type: string, message: Array<string> | string) {
      super(JSON.stringify(message));
      if (message instanceof Array) {
         const errors: any[] = [];
          message.forEach(element => {
            errors.push(new ApplicationError(type, JSON.stringify(element)));
          });
          this.error = errors; 
      } else {
        this.error = [new ApplicationError(type, message)];
      }
      Error.captureStackTrace(this, this.constructor);
    }
  }

  export class HTTP500Error extends Error implements GResponse {
    responseType = 'error';
    result = [];
    error: ApplicationError[];

    constructor(type: string, message: object | string) {
      super(JSON.stringify(message));
      if (message instanceof Array) {
        const errors: any[] = [];
         message.forEach(element => {
           errors.push(new ApplicationError(type, JSON.stringify(element)));
         });
         this.error = errors; 
     } else {
       this.error = [new ApplicationError(type, message)];
     }
      Error.captureStackTrace(this, this.constructor);
    }
  }