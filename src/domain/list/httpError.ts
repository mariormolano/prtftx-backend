export const HttpList = {
  // 201 Created
  UserSuccessfullyRegistered: {
    status: 201,
    message: "Usuario registrado exitosamente",
  },
  SuccessfulLogin: {
    status: 201,
    message: "Inicio de sesión exitoso",
  },

  // 400 Bad Request
  InvalidToken: {
    status: 400,
    message: "Token inválido",
  },
  BadRequest: {
    status: 400,
    message: "Solicitud incorrecta",
  },
  IncompleteData: {
    status: 400,
    message: "Datos incompletos",
  },
  EmailAlreadyRegistered: {
    status: 400,
    message: "El correo electrónico ya está registrado",
  },
  InvalidCredentials: {
    status: 400,
    message: "Credenciales inválidas",
  },

  // 401 Unauthorized
  UserNotFound: {
    status: 401,
    message: "Usuario no encontrado",
  },
  TokenNotProvided: {
    status: 401,
    message: "Token no proveído",
  },
  TokenNotFound: {
    status: 401,
    message: "Token no encontrado",
  },
  Unauthenticated: {
    status: 401,
    message: "Usuario no autenticado",
  },

  // 402 Payment Required
  PaymentRequired: {
    status: 402,
    message: "Pago requerido",
  },

  // 403 Forbidden
  Unauthorized: {
    status: 403,
    message: "No tienes permiso para esta acción",
  },
  UserNoRegistered: {
    status: 403,
    message: "Error al registrar el usuario",
  },

  // 404 Not Found
  NotFound: {
    status: 404,
    message: "No encontrado",
  },

  // 409 Conflict
  Conflict: {
    status: 409,
    message: "Conflicto",
  },

  // 411 Length Required
  LengthRequired: {
    status: 411,
    message: "Longitud requerida",
  },

  // 412 Precondition Failed
  PreconditionFailed: {
    status: 412,
    message: "Falló la condición previa",
  },

  // 413 Payload Too Large
  RequestEntityTooLarge: {
    status: 413,
    message: "Entidad de solicitud demasiado grande",
  },

  // 414 URI Too Long
  RequestURITooLong: {
    status: 414,
    message: "URI de solicitud demasiado larga",
  },

  // 415 Unsupported Media Type
  UnsupportedMediaType: {
    status: 415,
    message: "Tipo de medio no soportado",
  },

  // 416 Requested Range Not Satisfiable
  RequestedRangeNotSatisfiable: {
    status: 416,
    message: "El rango solicitado no es satisfactorio",
  },

  // 417 Expectation Failed
  ExpectationFailed: {
    status: 417,
    message: "Falló la expectativa",
  },

  // 421 Misdirected Request
  MisdirectedRequest: {
    status: 421,
    message: "Solicitud mal dirigida",
  },

  // 422 Unprocessable Entity
  ValidationError: {
    status: 422,
    message: "Error de validación",
  },
  UnprocessableEntity: {
    status: 422,
    message: "Entidad no procesable",
  },

  // 423 Locked
  Locked: {
    status: 423,
    message: "Bloqueado",
  },

  // 424 Failed Dependency
  FailedDependency: {
    status: 424,
    message: "Dependencia fallida",
  },

  // 425 Too Early
  TooEarly: {
    status: 425,
    message: "Demasiado temprano",
  },

  // 426 Upgrade Required
  UpgradeRequired: {
    status: 426,
    message: "Se requiere actualización",
  },

  // 428 Precondition Required
  PreconditionRequired: {
    status: 428,
    message: "Se requiere condición previa",
  },

  // 429 Too Many Requests
  TooManyRequests: {
    status: 429,
    message: "Demasiadas solicitudes",
  },

  // 431 Request Header Fields Too Large
  RequestHeaderFieldsTooLarge: {
    status: 431,
    message: "Campos de encabezado de solicitud demasiado grandes",
  },

  // 500 Internal Server Error
  InternalServerError: {
    status: 500,
    message: "Error interno del servidor",
  },

  // 501 Not Implemented
  NotImplemented: {
    status: 501,
    message: "No implementado",
  },

  // 502 Bad Gateway
  BadGateway: {
    status: 502,
    message: "Puerta de enlace incorrecta",
  },

  // 503 Service Unavailable
  ServiceUnavailable: {
    status: 503,
    message: "Servicio no disponible",
  },

  // 504 Gateway Timeout
  GatewayTimeout: {
    status: 504,
    message: "Tiempo de espera agotado",
  },
};
