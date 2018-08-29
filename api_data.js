define({ "api": [
  {
    "type": "post",
    "url": "/attachment",
    "title": "Создать или обновить вложение",
    "version": "0.0.0",
    "name": "Create",
    "group": "Attachment",
    "permission": [
      {
        "name": "Юридическое лицо"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "url",
            "description": "<p>URL</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр url неверный": [
          {
            "group": "Bad Request 400 - Параметр url неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_NOT_EMPTY_STRING\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр url неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется юридическое лицо": [
          {
            "group": "Unauthorized 401 - Требуется юридическое лицо",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_ENTITY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется юридическое лицо",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/attachment/root.ts",
    "groupTitle": "Attachment",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/attachment",
    "title": "Получить вложение",
    "version": "0.0.0",
    "name": "Get",
    "group": "Attachment",
    "permission": [
      {
        "name": "Юридическое лицо"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "url",
            "description": "<p>URL</p>"
          }
        ]
      }
    },
    "filename": "routes/api/attachment/root.ts",
    "groupTitle": "Attachment",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется юридическое лицо": [
          {
            "group": "Unauthorized 401 - Требуется юридическое лицо",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_ENTITY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется юридическое лицо",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/attachment/:id",
    "title": "Получить вложение юридического лица",
    "version": "0.0.0",
    "name": "GetById",
    "group": "Attachment",
    "permission": [
      {
        "name": "Модератор"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": ":id",
            "description": "<p>ID юридического лица</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "url",
            "description": "<p>URL</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Параметр :id неверный": [
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется модератор": [
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_MODERATOR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/attachment/root.ts",
    "groupTitle": "Attachment",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/employee",
    "title": "Зарегистрировать сотрудника и отправить ему пригласительный email",
    "version": "0.0.0",
    "name": "Invite",
    "group": "Employee",
    "permission": [
      {
        "name": "Администратор"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"ISO 639-1 в нижнем регистре\""
            ],
            "optional": false,
            "field": "language",
            "description": "<p>Язык</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Имя</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Телефон</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "id",
            "description": "<p>ID сотрудника</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр email неверный": [
          {
            "group": "Bad Request 400 - Параметр email неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_EMAIL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр email неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр language неверный": [
          {
            "group": "Bad Request 400 - Параметр language неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_ENUM\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр language неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр name неверный": [
          {
            "group": "Bad Request 400 - Параметр name неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_NOT_EMPTY_STRING\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр name неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр phone неверный": [
          {
            "group": "Bad Request 400 - Параметр phone неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PHONE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр phone неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется администратор": [
          {
            "group": "Unauthorized 401 - Требуется администратор",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_ADMIN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется администратор",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Пользователь уже существует": [
          {
            "group": "Bad Request 400 - Пользователь уже существует",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_FOUND_BY_EMAIL_AND_PHONE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пользователь уже существует",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Email уже существует": [
          {
            "group": "Bad Request 400 - Email уже существует",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_FOUND_BY_EMAIL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Email уже существует",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Телефон уже существует": [
          {
            "group": "Bad Request 400 - Телефон уже существует",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_FOUND_BY_PHONE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Телефон уже существует",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/employee/root.ts",
    "groupTitle": "Employee",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/employee/search",
    "title": "Поиск по сотрудникам",
    "version": "0.0.0",
    "name": "Search",
    "group": "Employee",
    "permission": [
      {
        "name": "Администратор"
      }
    ],
    "description": "<p>Результаты отсортированы по ID в порядке возрастания</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "admin",
            "description": "<p>Фильтр по администраторам</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "banned",
            "description": "<p>Фильтр по бану</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": true,
            "field": "id",
            "description": "<p>Фильтр по ID сотрудника</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": true,
            "field": "limit",
            "description": "<p>Лимит</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "moderator",
            "description": "<p>Фильтр по модераторам</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": true,
            "field": "offset",
            "description": "<p>Оффсет</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "employees",
            "description": "<p>Массив сотрудников</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "employees.admin",
            "description": "<p>Есть ли права администратора?</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "employees.banned",
            "description": "<p>Забанен ли сотрудник?</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "employees.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "employees.id",
            "description": "<p>ID сотрудника</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "employees.moderator",
            "description": "<p>Есть ли права модератора?</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "employees.name",
            "description": "<p>Имя</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "employees.phone",
            "description": "<p>Телефон</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "employees.registration",
            "description": "<p>Дата регистрации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр admin, banned или moderator неверный": [
          {
            "group": "Bad Request 400 - Параметр admin, banned или moderator неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_BOOLEAN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр admin, banned или moderator неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр id неверный": [
          {
            "group": "Bad Request 400 - Параметр id неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр id неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр limit неверный": [
          {
            "group": "Bad Request 400 - Параметр limit неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_LIMIT\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр limit неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр offset неверный": [
          {
            "group": "Bad Request 400 - Параметр offset неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_OFFSET\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр offset неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется администратор": [
          {
            "group": "Unauthorized 401 - Требуется администратор",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_ADMIN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется администратор",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/employee/search.ts",
    "groupTitle": "Employee",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/employee/:id",
    "title": "Изменить сотрудника",
    "version": "0.0.0",
    "name": "Update",
    "group": "Employee",
    "permission": [
      {
        "name": "Администратор"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": ":id",
            "description": "<p>ID сотрудника</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "banned",
            "description": "<p>Забанен ли сотрудник?</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "admin",
            "description": "<p>Есть ли права администратора?</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "moderator",
            "description": "<p>Есть ли права модератора?</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр :id неверный": [
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр admin, banned или moderator неверный": [
          {
            "group": "Bad Request 400 - Параметр admin, banned или moderator неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_BOOLEAN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр admin, banned или moderator неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Сотрудник не найден": [
          {
            "group": "Bad Request 400 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется администратор": [
          {
            "group": "Unauthorized 401 - Требуется администратор",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_ADMIN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется администратор",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/employee/root.ts",
    "groupTitle": "Employee",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/entity/search",
    "title": "Поиск по юридическим лицам",
    "version": "0.0.0",
    "name": "Search",
    "group": "Entity",
    "permission": [
      {
        "name": "Модератор"
      }
    ],
    "description": "<p>Результаты отсортированы по ID в порядке возрастания</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "banned",
            "description": "<p>Фильтр по бану</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": true,
            "field": "id",
            "description": "<p>Фильтр по ID юридического лица</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": true,
            "field": "limit",
            "description": "<p>Лимит</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": true,
            "field": "offset",
            "description": "<p>Оффсет</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "verified",
            "description": "<p>Фильтр по проверенным</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "entities",
            "description": "<p>Массив юридических лиц</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "entities.banned",
            "description": "<p>Забанено ли юридическое лицо?</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "entities.ceo",
            "description": "<p>Директор</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "entities.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "entities.id",
            "description": "<p>ID юридического лица</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "entities.itn",
            "description": "<p>Идентификационный номер налогоплательщика</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "entities.name",
            "description": "<p>Название огранизации</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "entities.phone",
            "description": "<p>Телефон</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "entities.psrn",
            "description": "<p>Основной государственный регистрационный номер</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "entities.registration",
            "description": "<p>Дата регистрации</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "entities.verified",
            "description": "<p>Проверено ли юридическое лицо?</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр banned или verified неверный": [
          {
            "group": "Bad Request 400 - Параметр banned или verified неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_BOOLEAN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр banned или verified неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр id неверный": [
          {
            "group": "Bad Request 400 - Параметр id неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр id неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр limit неверный": [
          {
            "group": "Bad Request 400 - Параметр limit неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_LIMIT\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр limit неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр offset неверный": [
          {
            "group": "Bad Request 400 - Параметр offset неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_OFFSET\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр offset неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется модератор": [
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_MODERATOR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/entity/search.ts",
    "groupTitle": "Entity",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/entity/:id",
    "title": "Изменить юридическое лицо",
    "version": "0.0.0",
    "name": "Update",
    "group": "Entity",
    "permission": [
      {
        "name": "Модератор"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": ":id",
            "description": "<p>ID юридического лица</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "banned",
            "description": "<p>Забанено ли юридическое лицо?</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "verified",
            "description": "<p>Проверено ли юридическое лицо?</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр :id неверный": [
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр banned или verified неверный": [
          {
            "group": "Bad Request 400 - Параметр banned или verified неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_BOOLEAN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр banned или verified неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Юридическое лицо не найдено": [
          {
            "group": "Bad Request 400 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется модератор": [
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_MODERATOR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/entity/root.ts",
    "groupTitle": "Entity",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/lot/bet/:id",
    "title": "Сделать ставку",
    "version": "0.0.0",
    "name": "Bet",
    "group": "Lot",
    "permission": [
      {
        "name": "Проверенное юридическое лицо"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": ":id",
            "description": "<p>ID лота</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки\""
            ],
            "optional": false,
            "field": "bid",
            "description": "<p>Новая ставка &gt;= 0</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "finish",
            "description": "<p>Время окончания аукциона</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": false,
            "field": "participants",
            "description": "<p>Число участников</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки\""
            ],
            "optional": true,
            "field": "winbid",
            "description": "<p>Ставка победителя</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": true,
            "field": "winner",
            "description": "<p>ID победителя</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр :id неверный": [
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр bid неверный": [
          {
            "group": "Bad Request 400 - Параметр bid неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_NUMERIC\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр bid неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Лот не существует или не активен": [
          {
            "group": "Bad Request 400 - Лот не существует или не активен",
            "type": "string",
            "allowedValues": [
              "\"DB_LOT_NOT_FOUND\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Лот не существует или не активен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется проверенное юридическое лицо": [
          {
            "group": "Unauthorized 401 - Требуется проверенное юридическое лицо",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_VERIFIED_ENTITY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется проверенное юридическое лицо",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/lot/bet.ts",
    "groupTitle": "Lot",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/lot",
    "title": "Создать новый лот",
    "version": "0.0.0",
    "name": "Create",
    "group": "Lot",
    "permission": [
      {
        "name": "Модератор"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки\""
            ],
            "optional": false,
            "field": "amount",
            "description": "<p>Количество материала &gt; 0</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"kg\"",
              "\"piece\""
            ],
            "optional": false,
            "field": "amount_type",
            "description": "<p>Тип количества</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "buffer",
            "description": "<p>Интервал времени, который всегда должен оставаться между временем последней ставки и временем окончания аукциона</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "buffer.years",
            "description": "<p>Годы</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "buffer.months",
            "description": "<p>Месяцы</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "buffer.days",
            "description": "<p>Дни</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "buffer.hours",
            "description": "<p>Часы</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "buffer.minutes",
            "description": "<p>Минуты</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "buffer.seconds",
            "description": "<p>Секунды</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "buffer.milliseconds",
            "description": "<p>Миллисекунды</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"ISO 4217:2015 в нижнем регистре\""
            ],
            "optional": false,
            "field": "currency",
            "description": "<p>Валюта</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "finish",
            "description": "<p>Время окончания аукциона</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "start",
            "description": "<p>Время начала аукциона</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки\""
            ],
            "optional": false,
            "field": "startbid",
            "description": "<p>Начальная ставка &gt;= 0</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки\""
            ],
            "optional": false,
            "field": "step",
            "description": "<p>Шаг аукциона &gt;= 0</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "stuffid",
            "description": "<p>ID материала</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"purchase\"",
              "\"sale\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Тип аукциона</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "id",
            "description": "<p>ID лота</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр amount, startbid или step неверный": [
          {
            "group": "Bad Request 400 - Параметр amount, startbid или step неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_NUMERIC\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр amount, startbid или step неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр amount_type, currency или type неверный": [
          {
            "group": "Bad Request 400 - Параметр amount_type, currency или type неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_ENUM\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр amount_type, currency или type неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр buffer неверный": [
          {
            "group": "Bad Request 400 - Параметр buffer неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_INTERVAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр buffer неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр finish или start неверный": [
          {
            "group": "Bad Request 400 - Параметр finish или start неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_DATE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр finish или start неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр stuffid неверный": [
          {
            "group": "Bad Request 400 - Параметр stuffid неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр stuffid неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Материал не найден": [
          {
            "group": "Bad Request 400 - Материал не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_STUFF_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Материал не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется модератор": [
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_MODERATOR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/lot/root.ts",
    "groupTitle": "Lot",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/lot/search",
    "title": "Поиск по лотам",
    "version": "0.0.0",
    "name": "Search",
    "group": "Lot",
    "permission": [
      {
        "name": "Пользователь"
      }
    ],
    "description": "<p>Результаты отсортированы по дате начала аукциона в порядке убывания</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "iAmParticipant",
            "description": "<p>Фильтр по тем лотам в которых пользователь принимал участие</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": true,
            "field": "id",
            "description": "<p>Фильтр по ID лота</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": true,
            "field": "limit",
            "description": "<p>Лимит</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": true,
            "field": "offset",
            "description": "<p>Оффсет</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": true,
            "field": "stuffid",
            "description": "<p>Фильтр по ID материала</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "lots",
            "description": "<p>Массив лотов</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки\""
            ],
            "optional": false,
            "field": "lots.amount",
            "description": "<p>Количество материала &gt; 0</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"kg\"",
              "\"piece\""
            ],
            "optional": false,
            "field": "lots.amount_type",
            "description": "<p>Тип количества</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "lots.buffer",
            "description": "<p>Интервал времени, который всегда должен оставаться между временем последней ставки и временем окончания аукциона</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": true,
            "field": "lots.buffer.years",
            "description": "<p>Годы</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": true,
            "field": "lots.buffer.months",
            "description": "<p>Месяцы</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": true,
            "field": "lots.buffer.days",
            "description": "<p>Дни</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": true,
            "field": "lots.buffer.hours",
            "description": "<p>Часы</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": true,
            "field": "lots.buffer.minutes",
            "description": "<p>Минуты</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": true,
            "field": "lots.buffer.seconds",
            "description": "<p>Секунды</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": true,
            "field": "lots.buffer.milliseconds",
            "description": "<p>Миллисекунды</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"ISO 4217:2015 в нижнем регистре\""
            ],
            "optional": false,
            "field": "lots.currency",
            "description": "<p>Валюта</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "lots.finish",
            "description": "<p>Время окончания аукциона</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "lots.id",
            "description": "<p>ID лота</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": false,
            "field": "lots.participants",
            "description": "<p>Число участников</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "lots.start",
            "description": "<p>Время начала аукциона</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки\""
            ],
            "optional": false,
            "field": "lots.startbid",
            "description": "<p>Начальная ставка &gt;= 0</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки\""
            ],
            "optional": false,
            "field": "lots.step",
            "description": "<p>Шаг аукциона &gt;= 0</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "lots.stuffid",
            "description": "<p>ID материала</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"purchase\"",
              "\"sale\""
            ],
            "optional": false,
            "field": "lots.type",
            "description": "<p>Тип аукциона</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки\""
            ],
            "optional": true,
            "field": "lots.winbid",
            "description": "<p>Ставка победителя</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": true,
            "field": "lots.winner",
            "description": "<p>ID победителя</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр iAmParticipant неверный": [
          {
            "group": "Bad Request 400 - Параметр iAmParticipant неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_BOOLEAN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр iAmParticipant неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр id и stuffid неверный": [
          {
            "group": "Bad Request 400 - Параметр id и stuffid неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр id и stuffid неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр limit неверный": [
          {
            "group": "Bad Request 400 - Параметр limit неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_LIMIT\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр limit неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр offset неверный": [
          {
            "group": "Bad Request 400 - Параметр offset неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_OFFSET\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр offset неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/lot/search.ts",
    "groupTitle": "Lot",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/password/reset",
    "title": "Сбросить пароль",
    "version": "0.0.0",
    "name": "PasswordReset",
    "group": "SignIn",
    "permission": [
      {
        "name": "Временный пользователь"
      }
    ],
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен сброса пароля</p>"
          }
        ],
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль (учитываются только первые 72 символа)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр password неверный": [
          {
            "group": "Bad Request 400 - Параметр password неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_ZXCVBN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр password неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь не найден": [
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_NOT_FOUND_BY_PASSWORD_RESET_TOKEN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/password/reset/root.ts",
    "groupTitle": "SignIn"
  },
  {
    "type": "post",
    "url": "/password/reset/email",
    "title": "Отправить email с токеном для сброса пароля",
    "version": "0.0.0",
    "name": "PasswordResetEmail",
    "group": "SignIn",
    "permission": [
      {
        "name": "Гость"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "g-recaptcha-response",
            "description": "<p>Токен reCaptcha</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "expires",
            "description": "<p>Дата, когда токен сброса пароля перестанет действовать</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр email неверный": [
          {
            "group": "Bad Request 400 - Параметр email неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_EMAIL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр email неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь не найден": [
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_NOT_FOUND_BY_EMAIL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/password/reset/email.ts",
    "groupTitle": "SignIn",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/signin",
    "title": "Вход в систему или начало двухэтапной аутентификации",
    "version": "0.0.0",
    "name": "SignIn",
    "group": "SignIn",
    "permission": [
      {
        "name": "Гость"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "g-recaptcha-response",
            "description": "<p>Токен reCaptcha</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль (учитываются только первые 72 символа)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200 - При включенной двухэтапной аутентификации": [
          {
            "group": "Success 200 - При включенной двухэтапной аутентификации",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "expires",
            "description": "<p>Дата, когда временный токен аутентификации перестанет действовать</p>"
          },
          {
            "group": "Success 200 - При включенной двухэтапной аутентификации",
            "type": "boolean",
            "allowedValues": [
              "true"
            ],
            "optional": false,
            "field": "tfa",
            "description": "<p>Включена ли двухэтапная аутентификация?</p>"
          },
          {
            "group": "Success 200 - При включенной двухэтапной аутентификации",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Временный токен аутентификации</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "tfa",
            "description": "<p>Включена ли двухэтапная аутентификация?</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Токен аутентификации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр email неверный": [
          {
            "group": "Bad Request 400 - Параметр email неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_EMAIL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр email неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр password неверный": [
          {
            "group": "Bad Request 400 - Параметр password неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_ZXCVBN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр password неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь не найден": [
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_NOT_FOUND\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - reCAPTCHA запретила доступ": [
          {
            "group": "Unauthorized 401 - reCAPTCHA запретила доступ",
            "type": "string",
            "allowedValues": [
              "\"WRONG_RECAPTCHA\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - reCAPTCHA запретила доступ",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/signin.ts",
    "groupTitle": "SignIn",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Регистрация юридического лица",
    "version": "0.0.0",
    "name": "SignUpEntity",
    "group": "SignIn",
    "permission": [
      {
        "name": "Гость"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "g-recaptcha-response",
            "description": "<p>Токен reCaptcha</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ceo",
            "description": "<p>Директор</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "itn",
            "description": "<p>Идентификационный номер налогоплательщика</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"ISO 639-1 в нижнем регистре\""
            ],
            "optional": false,
            "field": "language",
            "description": "<p>Язык</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Название огранизации</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль (учитываются только первые 72 символа)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Телефон</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "psrn",
            "description": "<p>Основной государственный регистрационный номер</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Токен аутентификации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр ceo или name неверный": [
          {
            "group": "Bad Request 400 - Параметр ceo или name неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_NOT_EMPTY_STRING\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр ceo или name неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр email неверный": [
          {
            "group": "Bad Request 400 - Параметр email неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_EMAIL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр email неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр itn неверный": [
          {
            "group": "Bad Request 400 - Параметр itn неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_JURIDICAL_ITN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр itn неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр language неверный": [
          {
            "group": "Bad Request 400 - Параметр language неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_ENUM\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр language неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр password неверный": [
          {
            "group": "Bad Request 400 - Параметр password неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_ZXCVBN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр password неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр phone неверный": [
          {
            "group": "Bad Request 400 - Параметр phone неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PHONE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр phone неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр psrn неверный": [
          {
            "group": "Bad Request 400 - Параметр psrn неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_JURIDICAL_PSRN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр psrn неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - reCAPTCHA запретила доступ": [
          {
            "group": "Unauthorized 401 - reCAPTCHA запретила доступ",
            "type": "string",
            "allowedValues": [
              "\"WRONG_RECAPTCHA\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - reCAPTCHA запретила доступ",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Пользователь уже существует": [
          {
            "group": "Bad Request 400 - Пользователь уже существует",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_FOUND_BY_EMAIL_AND_PHONE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пользователь уже существует",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Email уже существует": [
          {
            "group": "Bad Request 400 - Email уже существует",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_FOUND_BY_EMAIL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Email уже существует",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Телефон уже существует": [
          {
            "group": "Bad Request 400 - Телефон уже существует",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_FOUND_BY_PHONE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Телефон уже существует",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Юридическое лицо уже существует": [
          {
            "group": "Bad Request 400 - Юридическое лицо уже существует",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_FOUND_BY_ITN_AND_PSRN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Юридическое лицо уже существует",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - ИНН уже существует": [
          {
            "group": "Bad Request 400 - ИНН уже существует",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_FOUND_BY_ITN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - ИНН уже существует",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - ОГРН уже существует": [
          {
            "group": "Bad Request 400 - ОГРН уже существует",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_FOUND_BY_PSRN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - ОГРН уже существует",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/signup.ts",
    "groupTitle": "SignIn",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/tfa/authenticator",
    "title": "Завершить двухэтапную аутентификацию при помощи Google Authenticator",
    "version": "0.0.0",
    "name": "TfaAuthenticator",
    "group": "SignIn",
    "permission": [
      {
        "name": "Временный пользователь"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Токен сгенерированный при помощи Google Authenticator</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр token неверный": [
          {
            "group": "Bad Request 400 - Параметр token неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_NOT_EMPTY_STRING\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр token неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Токен не прошел проверку": [
          {
            "group": "Unauthorized 401 - Токен не прошел проверку",
            "type": "string",
            "allowedValues": [
              "\"AUTHENTICATOR_WRONG_TOKEN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Токен не прошел проверку",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь не найден": [
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_NOT_FOUND_BY_PURGATORY_TOKEN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/tfa/authenticator.ts",
    "groupTitle": "SignIn",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization Header": [
          {
            "group": "Authorization Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> временный токен аутентификации</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "tfa",
            "description": "<p>Включена ли двухэтапная аутентификация?</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/tfa/email",
    "title": "Завершить двухэтапную аутентификацию при помощи токена полученного по email",
    "version": "0.0.0",
    "name": "TfaEmail",
    "group": "SignIn",
    "permission": [
      {
        "name": "Временный пользователь"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Токен полученный по email</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр token неверный": [
          {
            "group": "Bad Request 400 - Параметр token неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_NOT_EMPTY_STRING\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр token неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Токен не найден": [
          {
            "group": "Unauthorized 401 - Токен не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_TOKENS_TFA_EMAIL_NOT_FOUND\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Токен не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь не найден": [
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_NOT_FOUND_BY_PURGATORY_TOKEN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/tfa/email.ts",
    "groupTitle": "SignIn",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization Header": [
          {
            "group": "Authorization Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> временный токен аутентификации</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "tfa",
            "description": "<p>Включена ли двухэтапная аутентификация?</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/tfa/email",
    "title": "Отправить email с токеном для завершения двухэтапной аутентификации",
    "version": "0.0.0",
    "name": "TfaEmailSend",
    "group": "SignIn",
    "permission": [
      {
        "name": "Временный пользователь"
      }
    ],
    "filename": "routes/api/tfa/email.ts",
    "groupTitle": "SignIn",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization Header": [
          {
            "group": "Authorization Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> временный токен аутентификации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь не найден": [
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_NOT_FOUND_BY_PURGATORY_TOKEN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/tfa/recovery",
    "title": "Завершить двухэтапную аутентификацию при помощи кода восстановления",
    "version": "0.0.0",
    "name": "TfaRecovery",
    "group": "SignIn",
    "permission": [
      {
        "name": "Временный пользователь"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Код восстановления</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр token неверный": [
          {
            "group": "Bad Request 400 - Параметр token неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_NOT_EMPTY_STRING\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр token неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Код восстановления не найден": [
          {
            "group": "Unauthorized 401 - Код восстановления не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_TOKENS_TFA_RECOVERY_NOT_FOUND\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Код восстановления не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь не найден": [
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_USER_NOT_FOUND_BY_PURGATORY_TOKEN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/tfa/recovery.ts",
    "groupTitle": "SignIn",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization Header": [
          {
            "group": "Authorization Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> временный токен аутентификации</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "tfa",
            "description": "<p>Включена ли двухэтапная аутентификация?</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/stuff",
    "title": "Создать новый материал",
    "version": "0.0.0",
    "name": "Create",
    "group": "Stuff",
    "permission": [
      {
        "name": "Модератор"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "id",
            "description": "<p>ID материала</p>"
          }
        ]
      }
    },
    "filename": "routes/api/stuff/root.ts",
    "groupTitle": "Stuff",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется модератор": [
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_MODERATOR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/stuff/search",
    "title": "Поиск по материалам",
    "version": "0.0.0",
    "name": "Search",
    "group": "Stuff",
    "permission": [
      {
        "name": "Пользователь"
      }
    ],
    "description": "<p>Результаты отсортированы по переводам в порядке возрастания</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"ISO 639-1 в нижнем регистре\""
            ],
            "optional": true,
            "field": "code",
            "description": "<p>Фильтр по коду языка перевода</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "enabled",
            "description": "<p>Фильтр по включеному состоянию</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": true,
            "field": "id",
            "description": "<p>Фильтр по ID материала</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": true,
            "field": "limit",
            "description": "<p>Лимит</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"0..9223372036854775807\""
            ],
            "optional": true,
            "field": "offset",
            "description": "<p>Оффсет</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "translation",
            "description": "<p>Фильтр по переводу (без учета регистра)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "stuffs",
            "description": "<p>Массив материалов</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "stuffs.enabled",
            "description": "<p>Включен ли материал?</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "stuffs.id",
            "description": "<p>ID материала</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "stuffs.tr",
            "description": "<p>Переводы</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.aa",
            "description": "<p>Перевод на язык под кодом &quot;aa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ab",
            "description": "<p>Перевод на язык под кодом &quot;ab&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ae",
            "description": "<p>Перевод на язык под кодом &quot;ae&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.af",
            "description": "<p>Перевод на язык под кодом &quot;af&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ak",
            "description": "<p>Перевод на язык под кодом &quot;ak&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.am",
            "description": "<p>Перевод на язык под кодом &quot;am&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.an",
            "description": "<p>Перевод на язык под кодом &quot;an&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ar",
            "description": "<p>Перевод на язык под кодом &quot;ar&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.as",
            "description": "<p>Перевод на язык под кодом &quot;as&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.av",
            "description": "<p>Перевод на язык под кодом &quot;av&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ay",
            "description": "<p>Перевод на язык под кодом &quot;ay&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.az",
            "description": "<p>Перевод на язык под кодом &quot;az&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ba",
            "description": "<p>Перевод на язык под кодом &quot;ba&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.be",
            "description": "<p>Перевод на язык под кодом &quot;be&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.bg",
            "description": "<p>Перевод на язык под кодом &quot;bg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.bh",
            "description": "<p>Перевод на язык под кодом &quot;bh&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.bi",
            "description": "<p>Перевод на язык под кодом &quot;bi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.bm",
            "description": "<p>Перевод на язык под кодом &quot;bm&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.bn",
            "description": "<p>Перевод на язык под кодом &quot;bn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.bo",
            "description": "<p>Перевод на язык под кодом &quot;bo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.br",
            "description": "<p>Перевод на язык под кодом &quot;br&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.bs",
            "description": "<p>Перевод на язык под кодом &quot;bs&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ca",
            "description": "<p>Перевод на язык под кодом &quot;ca&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ce",
            "description": "<p>Перевод на язык под кодом &quot;ce&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ch",
            "description": "<p>Перевод на язык под кодом &quot;ch&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.co",
            "description": "<p>Перевод на язык под кодом &quot;co&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.cr",
            "description": "<p>Перевод на язык под кодом &quot;cr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.cs",
            "description": "<p>Перевод на язык под кодом &quot;cs&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.cu",
            "description": "<p>Перевод на язык под кодом &quot;cu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.cv",
            "description": "<p>Перевод на язык под кодом &quot;cv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.cy",
            "description": "<p>Перевод на язык под кодом &quot;cy&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.da",
            "description": "<p>Перевод на язык под кодом &quot;da&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.de",
            "description": "<p>Перевод на язык под кодом &quot;de&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.dv",
            "description": "<p>Перевод на язык под кодом &quot;dv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.dz",
            "description": "<p>Перевод на язык под кодом &quot;dz&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ee",
            "description": "<p>Перевод на язык под кодом &quot;ee&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.el",
            "description": "<p>Перевод на язык под кодом &quot;el&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.en",
            "description": "<p>Перевод на язык под кодом &quot;en&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.eo",
            "description": "<p>Перевод на язык под кодом &quot;eo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.es",
            "description": "<p>Перевод на язык под кодом &quot;es&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.et",
            "description": "<p>Перевод на язык под кодом &quot;et&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.eu",
            "description": "<p>Перевод на язык под кодом &quot;eu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.fa",
            "description": "<p>Перевод на язык под кодом &quot;fa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ff",
            "description": "<p>Перевод на язык под кодом &quot;ff&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.fi",
            "description": "<p>Перевод на язык под кодом &quot;fi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.fj",
            "description": "<p>Перевод на язык под кодом &quot;fj&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.fl",
            "description": "<p>Перевод на язык под кодом &quot;fl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.fo",
            "description": "<p>Перевод на язык под кодом &quot;fo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.fr",
            "description": "<p>Перевод на язык под кодом &quot;fr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.fy",
            "description": "<p>Перевод на язык под кодом &quot;fy&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ga",
            "description": "<p>Перевод на язык под кодом &quot;ga&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.gd",
            "description": "<p>Перевод на язык под кодом &quot;gd&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.gl",
            "description": "<p>Перевод на язык под кодом &quot;gl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.gn",
            "description": "<p>Перевод на язык под кодом &quot;gn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.gu",
            "description": "<p>Перевод на язык под кодом &quot;gu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.gv",
            "description": "<p>Перевод на язык под кодом &quot;gv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ha",
            "description": "<p>Перевод на язык под кодом &quot;ha&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.he",
            "description": "<p>Перевод на язык под кодом &quot;he&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.hi",
            "description": "<p>Перевод на язык под кодом &quot;hi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ho",
            "description": "<p>Перевод на язык под кодом &quot;ho&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.hr",
            "description": "<p>Перевод на язык под кодом &quot;hr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ht",
            "description": "<p>Перевод на язык под кодом &quot;ht&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.hu",
            "description": "<p>Перевод на язык под кодом &quot;hu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.hy",
            "description": "<p>Перевод на язык под кодом &quot;hy&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.hz",
            "description": "<p>Перевод на язык под кодом &quot;hz&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ia",
            "description": "<p>Перевод на язык под кодом &quot;ia&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.id",
            "description": "<p>Перевод на язык под кодом &quot;id&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ie",
            "description": "<p>Перевод на язык под кодом &quot;ie&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ig",
            "description": "<p>Перевод на язык под кодом &quot;ig&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ii",
            "description": "<p>Перевод на язык под кодом &quot;ii&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ik",
            "description": "<p>Перевод на язык под кодом &quot;ik&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.io",
            "description": "<p>Перевод на язык под кодом &quot;io&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.is",
            "description": "<p>Перевод на язык под кодом &quot;is&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.it",
            "description": "<p>Перевод на язык под кодом &quot;it&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.iu",
            "description": "<p>Перевод на язык под кодом &quot;iu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ja",
            "description": "<p>Перевод на язык под кодом &quot;ja&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.jv",
            "description": "<p>Перевод на язык под кодом &quot;jv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ka",
            "description": "<p>Перевод на язык под кодом &quot;ka&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.kg",
            "description": "<p>Перевод на язык под кодом &quot;kg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ki",
            "description": "<p>Перевод на язык под кодом &quot;ki&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.kj",
            "description": "<p>Перевод на язык под кодом &quot;kj&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.kk",
            "description": "<p>Перевод на язык под кодом &quot;kk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.kl",
            "description": "<p>Перевод на язык под кодом &quot;kl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.km",
            "description": "<p>Перевод на язык под кодом &quot;km&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.kn",
            "description": "<p>Перевод на язык под кодом &quot;kn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ko",
            "description": "<p>Перевод на язык под кодом &quot;ko&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.kr",
            "description": "<p>Перевод на язык под кодом &quot;kr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ks",
            "description": "<p>Перевод на язык под кодом &quot;ks&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ku",
            "description": "<p>Перевод на язык под кодом &quot;ku&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.kv",
            "description": "<p>Перевод на язык под кодом &quot;kv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.kw",
            "description": "<p>Перевод на язык под кодом &quot;kw&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ky",
            "description": "<p>Перевод на язык под кодом &quot;ky&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.la",
            "description": "<p>Перевод на язык под кодом &quot;la&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.lb",
            "description": "<p>Перевод на язык под кодом &quot;lb&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.lg",
            "description": "<p>Перевод на язык под кодом &quot;lg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.li",
            "description": "<p>Перевод на язык под кодом &quot;li&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ln",
            "description": "<p>Перевод на язык под кодом &quot;ln&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.lo",
            "description": "<p>Перевод на язык под кодом &quot;lo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.lt",
            "description": "<p>Перевод на язык под кодом &quot;lt&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.lu",
            "description": "<p>Перевод на язык под кодом &quot;lu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.lv",
            "description": "<p>Перевод на язык под кодом &quot;lv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.mg",
            "description": "<p>Перевод на язык под кодом &quot;mg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.mh",
            "description": "<p>Перевод на язык под кодом &quot;mh&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.mi",
            "description": "<p>Перевод на язык под кодом &quot;mi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.mk",
            "description": "<p>Перевод на язык под кодом &quot;mk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ml",
            "description": "<p>Перевод на язык под кодом &quot;ml&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.mn",
            "description": "<p>Перевод на язык под кодом &quot;mn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.mr",
            "description": "<p>Перевод на язык под кодом &quot;mr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ms",
            "description": "<p>Перевод на язык под кодом &quot;ms&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.mt",
            "description": "<p>Перевод на язык под кодом &quot;mt&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.my",
            "description": "<p>Перевод на язык под кодом &quot;my&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.na",
            "description": "<p>Перевод на язык под кодом &quot;na&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.nb",
            "description": "<p>Перевод на язык под кодом &quot;nb&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.nd",
            "description": "<p>Перевод на язык под кодом &quot;nd&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ne",
            "description": "<p>Перевод на язык под кодом &quot;ne&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ng",
            "description": "<p>Перевод на язык под кодом &quot;ng&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.nl",
            "description": "<p>Перевод на язык под кодом &quot;nl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.nn",
            "description": "<p>Перевод на язык под кодом &quot;nn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.no",
            "description": "<p>Перевод на язык под кодом &quot;no&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.nr",
            "description": "<p>Перевод на язык под кодом &quot;nr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.nv",
            "description": "<p>Перевод на язык под кодом &quot;nv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ny",
            "description": "<p>Перевод на язык под кодом &quot;ny&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.oc",
            "description": "<p>Перевод на язык под кодом &quot;oc&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.oj",
            "description": "<p>Перевод на язык под кодом &quot;oj&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.om",
            "description": "<p>Перевод на язык под кодом &quot;om&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.or",
            "description": "<p>Перевод на язык под кодом &quot;or&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.os",
            "description": "<p>Перевод на язык под кодом &quot;os&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.pa",
            "description": "<p>Перевод на язык под кодом &quot;pa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.pi",
            "description": "<p>Перевод на язык под кодом &quot;pi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.pl",
            "description": "<p>Перевод на язык под кодом &quot;pl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ps",
            "description": "<p>Перевод на язык под кодом &quot;ps&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.pt",
            "description": "<p>Перевод на язык под кодом &quot;pt&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.qu",
            "description": "<p>Перевод на язык под кодом &quot;qu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.rm",
            "description": "<p>Перевод на язык под кодом &quot;rm&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.rn",
            "description": "<p>Перевод на язык под кодом &quot;rn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ro",
            "description": "<p>Перевод на язык под кодом &quot;ro&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ru",
            "description": "<p>Перевод на язык под кодом &quot;ru&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.rw",
            "description": "<p>Перевод на язык под кодом &quot;rw&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sa",
            "description": "<p>Перевод на язык под кодом &quot;sa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sc",
            "description": "<p>Перевод на язык под кодом &quot;sc&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sd",
            "description": "<p>Перевод на язык под кодом &quot;sd&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.se",
            "description": "<p>Перевод на язык под кодом &quot;se&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sg",
            "description": "<p>Перевод на язык под кодом &quot;sg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.si",
            "description": "<p>Перевод на язык под кодом &quot;si&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sk",
            "description": "<p>Перевод на язык под кодом &quot;sk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sl",
            "description": "<p>Перевод на язык под кодом &quot;sl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sm",
            "description": "<p>Перевод на язык под кодом &quot;sm&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sn",
            "description": "<p>Перевод на язык под кодом &quot;sn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.so",
            "description": "<p>Перевод на язык под кодом &quot;so&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sq",
            "description": "<p>Перевод на язык под кодом &quot;sq&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sr",
            "description": "<p>Перевод на язык под кодом &quot;sr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ss",
            "description": "<p>Перевод на язык под кодом &quot;ss&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.st",
            "description": "<p>Перевод на язык под кодом &quot;st&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.su",
            "description": "<p>Перевод на язык под кодом &quot;su&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sv",
            "description": "<p>Перевод на язык под кодом &quot;sv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.sw",
            "description": "<p>Перевод на язык под кодом &quot;sw&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ta",
            "description": "<p>Перевод на язык под кодом &quot;ta&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.te",
            "description": "<p>Перевод на язык под кодом &quot;te&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.tg",
            "description": "<p>Перевод на язык под кодом &quot;tg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.th",
            "description": "<p>Перевод на язык под кодом &quot;th&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ti",
            "description": "<p>Перевод на язык под кодом &quot;ti&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.tk",
            "description": "<p>Перевод на язык под кодом &quot;tk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.tl",
            "description": "<p>Перевод на язык под кодом &quot;tl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.tn",
            "description": "<p>Перевод на язык под кодом &quot;tn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.to",
            "description": "<p>Перевод на язык под кодом &quot;to&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.tr",
            "description": "<p>Перевод на язык под кодом &quot;tr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ts",
            "description": "<p>Перевод на язык под кодом &quot;ts&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.tt",
            "description": "<p>Перевод на язык под кодом &quot;tt&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.tw",
            "description": "<p>Перевод на язык под кодом &quot;tw&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ty",
            "description": "<p>Перевод на язык под кодом &quot;ty&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ug",
            "description": "<p>Перевод на язык под кодом &quot;ug&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.uk",
            "description": "<p>Перевод на язык под кодом &quot;uk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ur",
            "description": "<p>Перевод на язык под кодом &quot;ur&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.uz",
            "description": "<p>Перевод на язык под кодом &quot;uz&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.ve",
            "description": "<p>Перевод на язык под кодом &quot;ve&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.vi",
            "description": "<p>Перевод на язык под кодом &quot;vi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.vo",
            "description": "<p>Перевод на язык под кодом &quot;vo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.wa",
            "description": "<p>Перевод на язык под кодом &quot;wa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.wo",
            "description": "<p>Перевод на язык под кодом &quot;wo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.xh",
            "description": "<p>Перевод на язык под кодом &quot;xh&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.yi",
            "description": "<p>Перевод на язык под кодом &quot;yi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.yo",
            "description": "<p>Перевод на язык под кодом &quot;yo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.za",
            "description": "<p>Перевод на язык под кодом &quot;za&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.zh",
            "description": "<p>Перевод на язык под кодом &quot;zh&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "stuffs.tr.zu",
            "description": "<p>Перевод на язык под кодом &quot;zu&quot; согласно ISO 639-1</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр code неверный": [
          {
            "group": "Bad Request 400 - Параметр code неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_ENUM\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр code неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр enabled неверный": [
          {
            "group": "Bad Request 400 - Параметр enabled неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_BOOLEAN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр enabled неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр id неверный": [
          {
            "group": "Bad Request 400 - Параметр id неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр id неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр limit неверный": [
          {
            "group": "Bad Request 400 - Параметр limit неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_LIMIT\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр limit неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр offset неверный": [
          {
            "group": "Bad Request 400 - Параметр offset неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_OFFSET\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр offset неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр translation неверный": [
          {
            "group": "Bad Request 400 - Параметр translation неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_NOT_EMPTY_STRING\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр translation неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/stuff/search.ts",
    "groupTitle": "Stuff",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/stuff/:id",
    "title": "Изменить материал",
    "version": "0.0.0",
    "name": "Update",
    "group": "Stuff",
    "permission": [
      {
        "name": "Модератор"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": ":id",
            "description": "<p>ID материала</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "enabled",
            "description": "<p>Включен ли материал?</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "tr",
            "description": "<p>Переводы</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.aa",
            "description": "<p>Перевод на язык под кодом &quot;aa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ab",
            "description": "<p>Перевод на язык под кодом &quot;ab&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ae",
            "description": "<p>Перевод на язык под кодом &quot;ae&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.af",
            "description": "<p>Перевод на язык под кодом &quot;af&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ak",
            "description": "<p>Перевод на язык под кодом &quot;ak&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.am",
            "description": "<p>Перевод на язык под кодом &quot;am&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.an",
            "description": "<p>Перевод на язык под кодом &quot;an&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ar",
            "description": "<p>Перевод на язык под кодом &quot;ar&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.as",
            "description": "<p>Перевод на язык под кодом &quot;as&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.av",
            "description": "<p>Перевод на язык под кодом &quot;av&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ay",
            "description": "<p>Перевод на язык под кодом &quot;ay&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.az",
            "description": "<p>Перевод на язык под кодом &quot;az&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ba",
            "description": "<p>Перевод на язык под кодом &quot;ba&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.be",
            "description": "<p>Перевод на язык под кодом &quot;be&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.bg",
            "description": "<p>Перевод на язык под кодом &quot;bg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.bh",
            "description": "<p>Перевод на язык под кодом &quot;bh&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.bi",
            "description": "<p>Перевод на язык под кодом &quot;bi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.bm",
            "description": "<p>Перевод на язык под кодом &quot;bm&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.bn",
            "description": "<p>Перевод на язык под кодом &quot;bn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.bo",
            "description": "<p>Перевод на язык под кодом &quot;bo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.br",
            "description": "<p>Перевод на язык под кодом &quot;br&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.bs",
            "description": "<p>Перевод на язык под кодом &quot;bs&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ca",
            "description": "<p>Перевод на язык под кодом &quot;ca&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ce",
            "description": "<p>Перевод на язык под кодом &quot;ce&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ch",
            "description": "<p>Перевод на язык под кодом &quot;ch&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.co",
            "description": "<p>Перевод на язык под кодом &quot;co&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.cr",
            "description": "<p>Перевод на язык под кодом &quot;cr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.cs",
            "description": "<p>Перевод на язык под кодом &quot;cs&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.cu",
            "description": "<p>Перевод на язык под кодом &quot;cu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.cv",
            "description": "<p>Перевод на язык под кодом &quot;cv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.cy",
            "description": "<p>Перевод на язык под кодом &quot;cy&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.da",
            "description": "<p>Перевод на язык под кодом &quot;da&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.de",
            "description": "<p>Перевод на язык под кодом &quot;de&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.dv",
            "description": "<p>Перевод на язык под кодом &quot;dv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.dz",
            "description": "<p>Перевод на язык под кодом &quot;dz&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ee",
            "description": "<p>Перевод на язык под кодом &quot;ee&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.el",
            "description": "<p>Перевод на язык под кодом &quot;el&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.en",
            "description": "<p>Перевод на язык под кодом &quot;en&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.eo",
            "description": "<p>Перевод на язык под кодом &quot;eo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.es",
            "description": "<p>Перевод на язык под кодом &quot;es&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.et",
            "description": "<p>Перевод на язык под кодом &quot;et&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.eu",
            "description": "<p>Перевод на язык под кодом &quot;eu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.fa",
            "description": "<p>Перевод на язык под кодом &quot;fa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ff",
            "description": "<p>Перевод на язык под кодом &quot;ff&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.fi",
            "description": "<p>Перевод на язык под кодом &quot;fi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.fj",
            "description": "<p>Перевод на язык под кодом &quot;fj&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.fl",
            "description": "<p>Перевод на язык под кодом &quot;fl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.fo",
            "description": "<p>Перевод на язык под кодом &quot;fo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.fr",
            "description": "<p>Перевод на язык под кодом &quot;fr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.fy",
            "description": "<p>Перевод на язык под кодом &quot;fy&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ga",
            "description": "<p>Перевод на язык под кодом &quot;ga&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.gd",
            "description": "<p>Перевод на язык под кодом &quot;gd&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.gl",
            "description": "<p>Перевод на язык под кодом &quot;gl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.gn",
            "description": "<p>Перевод на язык под кодом &quot;gn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.gu",
            "description": "<p>Перевод на язык под кодом &quot;gu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.gv",
            "description": "<p>Перевод на язык под кодом &quot;gv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ha",
            "description": "<p>Перевод на язык под кодом &quot;ha&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.he",
            "description": "<p>Перевод на язык под кодом &quot;he&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.hi",
            "description": "<p>Перевод на язык под кодом &quot;hi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ho",
            "description": "<p>Перевод на язык под кодом &quot;ho&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.hr",
            "description": "<p>Перевод на язык под кодом &quot;hr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ht",
            "description": "<p>Перевод на язык под кодом &quot;ht&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.hu",
            "description": "<p>Перевод на язык под кодом &quot;hu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.hy",
            "description": "<p>Перевод на язык под кодом &quot;hy&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.hz",
            "description": "<p>Перевод на язык под кодом &quot;hz&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ia",
            "description": "<p>Перевод на язык под кодом &quot;ia&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.id",
            "description": "<p>Перевод на язык под кодом &quot;id&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ie",
            "description": "<p>Перевод на язык под кодом &quot;ie&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ig",
            "description": "<p>Перевод на язык под кодом &quot;ig&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ii",
            "description": "<p>Перевод на язык под кодом &quot;ii&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ik",
            "description": "<p>Перевод на язык под кодом &quot;ik&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.io",
            "description": "<p>Перевод на язык под кодом &quot;io&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.is",
            "description": "<p>Перевод на язык под кодом &quot;is&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.it",
            "description": "<p>Перевод на язык под кодом &quot;it&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.iu",
            "description": "<p>Перевод на язык под кодом &quot;iu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ja",
            "description": "<p>Перевод на язык под кодом &quot;ja&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.jv",
            "description": "<p>Перевод на язык под кодом &quot;jv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ka",
            "description": "<p>Перевод на язык под кодом &quot;ka&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.kg",
            "description": "<p>Перевод на язык под кодом &quot;kg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ki",
            "description": "<p>Перевод на язык под кодом &quot;ki&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.kj",
            "description": "<p>Перевод на язык под кодом &quot;kj&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.kk",
            "description": "<p>Перевод на язык под кодом &quot;kk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.kl",
            "description": "<p>Перевод на язык под кодом &quot;kl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.km",
            "description": "<p>Перевод на язык под кодом &quot;km&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.kn",
            "description": "<p>Перевод на язык под кодом &quot;kn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ko",
            "description": "<p>Перевод на язык под кодом &quot;ko&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.kr",
            "description": "<p>Перевод на язык под кодом &quot;kr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ks",
            "description": "<p>Перевод на язык под кодом &quot;ks&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ku",
            "description": "<p>Перевод на язык под кодом &quot;ku&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.kv",
            "description": "<p>Перевод на язык под кодом &quot;kv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.kw",
            "description": "<p>Перевод на язык под кодом &quot;kw&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ky",
            "description": "<p>Перевод на язык под кодом &quot;ky&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.la",
            "description": "<p>Перевод на язык под кодом &quot;la&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.lb",
            "description": "<p>Перевод на язык под кодом &quot;lb&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.lg",
            "description": "<p>Перевод на язык под кодом &quot;lg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.li",
            "description": "<p>Перевод на язык под кодом &quot;li&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ln",
            "description": "<p>Перевод на язык под кодом &quot;ln&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.lo",
            "description": "<p>Перевод на язык под кодом &quot;lo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.lt",
            "description": "<p>Перевод на язык под кодом &quot;lt&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.lu",
            "description": "<p>Перевод на язык под кодом &quot;lu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.lv",
            "description": "<p>Перевод на язык под кодом &quot;lv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.mg",
            "description": "<p>Перевод на язык под кодом &quot;mg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.mh",
            "description": "<p>Перевод на язык под кодом &quot;mh&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.mi",
            "description": "<p>Перевод на язык под кодом &quot;mi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.mk",
            "description": "<p>Перевод на язык под кодом &quot;mk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ml",
            "description": "<p>Перевод на язык под кодом &quot;ml&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.mn",
            "description": "<p>Перевод на язык под кодом &quot;mn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.mr",
            "description": "<p>Перевод на язык под кодом &quot;mr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ms",
            "description": "<p>Перевод на язык под кодом &quot;ms&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.mt",
            "description": "<p>Перевод на язык под кодом &quot;mt&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.my",
            "description": "<p>Перевод на язык под кодом &quot;my&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.na",
            "description": "<p>Перевод на язык под кодом &quot;na&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.nb",
            "description": "<p>Перевод на язык под кодом &quot;nb&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.nd",
            "description": "<p>Перевод на язык под кодом &quot;nd&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ne",
            "description": "<p>Перевод на язык под кодом &quot;ne&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ng",
            "description": "<p>Перевод на язык под кодом &quot;ng&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.nl",
            "description": "<p>Перевод на язык под кодом &quot;nl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.nn",
            "description": "<p>Перевод на язык под кодом &quot;nn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.no",
            "description": "<p>Перевод на язык под кодом &quot;no&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.nr",
            "description": "<p>Перевод на язык под кодом &quot;nr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.nv",
            "description": "<p>Перевод на язык под кодом &quot;nv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ny",
            "description": "<p>Перевод на язык под кодом &quot;ny&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.oc",
            "description": "<p>Перевод на язык под кодом &quot;oc&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.oj",
            "description": "<p>Перевод на язык под кодом &quot;oj&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.om",
            "description": "<p>Перевод на язык под кодом &quot;om&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.or",
            "description": "<p>Перевод на язык под кодом &quot;or&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.os",
            "description": "<p>Перевод на язык под кодом &quot;os&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.pa",
            "description": "<p>Перевод на язык под кодом &quot;pa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.pi",
            "description": "<p>Перевод на язык под кодом &quot;pi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.pl",
            "description": "<p>Перевод на язык под кодом &quot;pl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ps",
            "description": "<p>Перевод на язык под кодом &quot;ps&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.pt",
            "description": "<p>Перевод на язык под кодом &quot;pt&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.qu",
            "description": "<p>Перевод на язык под кодом &quot;qu&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.rm",
            "description": "<p>Перевод на язык под кодом &quot;rm&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.rn",
            "description": "<p>Перевод на язык под кодом &quot;rn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ro",
            "description": "<p>Перевод на язык под кодом &quot;ro&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ru",
            "description": "<p>Перевод на язык под кодом &quot;ru&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.rw",
            "description": "<p>Перевод на язык под кодом &quot;rw&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sa",
            "description": "<p>Перевод на язык под кодом &quot;sa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sc",
            "description": "<p>Перевод на язык под кодом &quot;sc&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sd",
            "description": "<p>Перевод на язык под кодом &quot;sd&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.se",
            "description": "<p>Перевод на язык под кодом &quot;se&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sg",
            "description": "<p>Перевод на язык под кодом &quot;sg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.si",
            "description": "<p>Перевод на язык под кодом &quot;si&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sk",
            "description": "<p>Перевод на язык под кодом &quot;sk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sl",
            "description": "<p>Перевод на язык под кодом &quot;sl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sm",
            "description": "<p>Перевод на язык под кодом &quot;sm&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sn",
            "description": "<p>Перевод на язык под кодом &quot;sn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.so",
            "description": "<p>Перевод на язык под кодом &quot;so&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sq",
            "description": "<p>Перевод на язык под кодом &quot;sq&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sr",
            "description": "<p>Перевод на язык под кодом &quot;sr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ss",
            "description": "<p>Перевод на язык под кодом &quot;ss&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.st",
            "description": "<p>Перевод на язык под кодом &quot;st&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.su",
            "description": "<p>Перевод на язык под кодом &quot;su&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sv",
            "description": "<p>Перевод на язык под кодом &quot;sv&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.sw",
            "description": "<p>Перевод на язык под кодом &quot;sw&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ta",
            "description": "<p>Перевод на язык под кодом &quot;ta&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.te",
            "description": "<p>Перевод на язык под кодом &quot;te&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.tg",
            "description": "<p>Перевод на язык под кодом &quot;tg&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.th",
            "description": "<p>Перевод на язык под кодом &quot;th&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ti",
            "description": "<p>Перевод на язык под кодом &quot;ti&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.tk",
            "description": "<p>Перевод на язык под кодом &quot;tk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.tl",
            "description": "<p>Перевод на язык под кодом &quot;tl&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.tn",
            "description": "<p>Перевод на язык под кодом &quot;tn&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.to",
            "description": "<p>Перевод на язык под кодом &quot;to&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.tr",
            "description": "<p>Перевод на язык под кодом &quot;tr&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ts",
            "description": "<p>Перевод на язык под кодом &quot;ts&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.tt",
            "description": "<p>Перевод на язык под кодом &quot;tt&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.tw",
            "description": "<p>Перевод на язык под кодом &quot;tw&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ty",
            "description": "<p>Перевод на язык под кодом &quot;ty&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ug",
            "description": "<p>Перевод на язык под кодом &quot;ug&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.uk",
            "description": "<p>Перевод на язык под кодом &quot;uk&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ur",
            "description": "<p>Перевод на язык под кодом &quot;ur&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.uz",
            "description": "<p>Перевод на язык под кодом &quot;uz&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.ve",
            "description": "<p>Перевод на язык под кодом &quot;ve&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.vi",
            "description": "<p>Перевод на язык под кодом &quot;vi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.vo",
            "description": "<p>Перевод на язык под кодом &quot;vo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.wa",
            "description": "<p>Перевод на язык под кодом &quot;wa&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.wo",
            "description": "<p>Перевод на язык под кодом &quot;wo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.xh",
            "description": "<p>Перевод на язык под кодом &quot;xh&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.yi",
            "description": "<p>Перевод на язык под кодом &quot;yi&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.yo",
            "description": "<p>Перевод на язык под кодом &quot;yo&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.za",
            "description": "<p>Перевод на язык под кодом &quot;za&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.zh",
            "description": "<p>Перевод на язык под кодом &quot;zh&quot; согласно ISO 639-1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tr.zu",
            "description": "<p>Перевод на язык под кодом &quot;zu&quot; согласно ISO 639-1</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр :id неверный": [
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_BIGSERIAL\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр :id неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр enabled неверный": [
          {
            "group": "Bad Request 400 - Параметр enabled неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_BOOLEAN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр enabled неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр tr неверный": [
          {
            "group": "Bad Request 400 - Параметр tr неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_OBJECT\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр tr неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр tr[*] неверный": [
          {
            "group": "Bad Request 400 - Параметр tr[*] неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_PG_ENUM\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр tr[*] неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр tr* неверный": [
          {
            "group": "Bad Request 400 - Параметр tr* неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_NOT_EMPTY_STRING\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр tr* неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Требуется модератор": [
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "allowedValues": [
              "\"REQUIRED_MODERATOR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Требуется модератор",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/stuff/root.ts",
    "groupTitle": "Stuff",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Получить информацию о самом себе",
    "version": "0.0.0",
    "name": "InfoAboutYourself",
    "group": "User",
    "permission": [
      {
        "name": "Пользователь"
      }
    ],
    "success": {
      "fields": {
        "Success 200 - Для сотрудника": [
          {
            "group": "Success 200 - Для сотрудника",
            "type": "boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>Есть ли права администратора?</p>"
          },
          {
            "group": "Success 200 - Для сотрудника",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200 - Для сотрудника",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "id",
            "description": "<p>ID</p>"
          },
          {
            "group": "Success 200 - Для сотрудника",
            "type": "string",
            "allowedValues": [
              "\"ISO 639-1 в нижнем регистре\""
            ],
            "optional": false,
            "field": "language",
            "description": "<p>Язык</p>"
          },
          {
            "group": "Success 200 - Для сотрудника",
            "type": "boolean",
            "optional": false,
            "field": "moderator",
            "description": "<p>Есть ли права модератора?</p>"
          },
          {
            "group": "Success 200 - Для сотрудника",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Имя</p>"
          },
          {
            "group": "Success 200 - Для сотрудника",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Телефон</p>"
          },
          {
            "group": "Success 200 - Для сотрудника",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "registration",
            "description": "<p>Дата регистрации</p>"
          },
          {
            "group": "Success 200 - Для сотрудника",
            "type": "boolean",
            "optional": false,
            "field": "tfa",
            "description": "<p>Включена ли двухэтапная аутентификация?</p>"
          },
          {
            "group": "Success 200 - Для сотрудника",
            "type": "string",
            "allowedValues": [
              "\"employee\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Тип пользователя</p>"
          }
        ],
        "Success 200 - Для юридического лица": [
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "optional": false,
            "field": "ceo",
            "description": "<p>Директор</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "allowedValues": [
              "\"1..9223372036854775807\""
            ],
            "optional": false,
            "field": "id",
            "description": "<p>ID</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "optional": false,
            "field": "itn",
            "description": "<p>Идентификационный номер налогоплательщика</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "allowedValues": [
              "\"ISO 639-1 в нижнем регистре\""
            ],
            "optional": false,
            "field": "language",
            "description": "<p>Язык</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Название огранизации</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Телефон</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "optional": false,
            "field": "psrn",
            "description": "<p>Основной государственный регистрационный номер</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "allowedValues": [
              "\"ISO 8601\""
            ],
            "optional": false,
            "field": "registration",
            "description": "<p>Дата регистрации</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "boolean",
            "optional": false,
            "field": "tfa",
            "description": "<p>Включена ли двухэтапная аутентификация?</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "string",
            "allowedValues": [
              "\"entity\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Тип пользователя</p>"
          },
          {
            "group": "Success 200 - Для юридического лица",
            "type": "boolean",
            "optional": false,
            "field": "verified",
            "description": "<p>Является ли учетная запись проверенной?</p>"
          }
        ]
      }
    },
    "filename": "routes/api/user/root.ts",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/user/tfa/authenticator",
    "title": "Сгенерировать новый секрет Google Authenticator",
    "version": "0.0.0",
    "name": "UpdateAuthenticator",
    "group": "User",
    "permission": [
      {
        "name": "Пользователь"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "keyuri",
            "description": "<p>URL для генерации QR кода</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "secret",
            "description": "<p>Секрет Google Authenticator</p>"
          }
        ]
      }
    },
    "filename": "routes/api/user/tfa/authenticator.ts",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/user/tfa",
    "title": "Включить или выключить двухэтапную аутентификацию",
    "version": "0.0.0",
    "name": "UpdateTFA",
    "group": "User",
    "permission": [
      {
        "name": "Пользователь"
      }
    ],
    "description": "<p>При выключении двухэтапной аутентификации также удаляться коды восстановления и секрет Google Authenticator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "tfa",
            "description": "<p>Новое состояние двухэтапной аутентификации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр tfa неверный": [
          {
            "group": "Bad Request 400 - Параметр tfa неверный",
            "type": "string",
            "allowedValues": [
              "\"WRONG_BOOLEAN\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр tfa неверный",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/user/tfa/root.ts",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/user/tfa/recovery",
    "title": "Сгенерировать новые коды восстановления",
    "version": "0.0.0",
    "name": "UpdateTfaRecoveryTokens",
    "group": "User",
    "permission": [
      {
        "name": "Пользователь"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string[]",
            "optional": false,
            "field": "tokens",
            "description": "<p>Коды восстановления (10 элементов по умолчанию)</p>"
          }
        ]
      }
    },
    "filename": "routes/api/user/tfa/recovery.ts",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p><strong>Bearer</strong> токен аутентификации</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Неверный токен аутентификации": [
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "allowedValues": [
              "\"JWT_VERIFY_USER\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Неверный токен аутентификации",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Сотрудник не найден": [
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "allowedValues": [
              "\"DB_EMPLOYEE_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Сотрудник не найден",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Юридическое лицо не найдено": [
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "allowedValues": [
              "\"DB_ENTITY_NOT_FOUND_BY_ID\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Юридическое лицо не найдено",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Unauthorized 401 - Пользователь забанен": [
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "allowedValues": [
              "\"BANNED\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Unauthorized 401 - Пользователь забанен",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/password/check",
    "title": "Проверить пароль",
    "version": "0.0.0",
    "name": "PasswordCheck",
    "group": "Utils",
    "permission": [
      {
        "name": "Гость"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль (учитываются только первые 72 символа)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "score",
            "description": "<p>Рейтинг пароля</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "allowedValues": [
              "0",
              "1",
              "2",
              "3",
              "4"
            ],
            "optional": false,
            "field": "score.actual",
            "description": "<p>Текущий рейтинг пароля</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "allowedValues": [
              "1",
              "3"
            ],
            "optional": false,
            "field": "score.expected",
            "description": "<p>Минимально резрешенный рейтинг пароля</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "allowedValues": [
              "4"
            ],
            "optional": false,
            "field": "score.max",
            "description": "<p>Максимальный рейтинг пароля</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "allowedValues": [
              "0"
            ],
            "optional": false,
            "field": "score.min",
            "description": "<p>Минимальный рейтинг пароля</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400 - Пропущен параметр": [
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_MISSING_KEY\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Пропущен параметр",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр равен null": [
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "allowedValues": [
              "\"OBJECT_NULL_VALUE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр равен null",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр password не строка": [
          {
            "group": "Bad Request 400 - Параметр password не строка",
            "type": "string",
            "allowedValues": [
              "\"WRONG_STRING\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр password не строка",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Bad Request 400 - Параметр password не той длины": [
          {
            "group": "Bad Request 400 - Параметр password не той длины",
            "type": "string",
            "allowedValues": [
              "\"WRONG_STRING_LENGTH_RANGE\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Bad Request 400 - Параметр password не той длины",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    },
    "filename": "routes/api/password/check.ts",
    "groupTitle": "Utils",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ]
      }
    }
  },
  {
    "type": "all",
    "url": "/ping",
    "title": "Проверить доступность сервера",
    "description": "<p>А также мини игра &quot;Настольный теннис&quot;</p>",
    "version": "0.0.0",
    "name": "Ping",
    "group": "Utils",
    "permission": [
      {
        "name": "Гость"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "pong",
            "description": "<p>Отбил ли сервер мячик?</p>"
          }
        ]
      }
    },
    "filename": "routes/api/ping.ts",
    "groupTitle": "Utils",
    "header": {
      "fields": {
        "Accept-Encoding": [
          {
            "group": "Accept-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Accept-Encoding",
            "description": "<p>Перечень поддерживаемых способов кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Content-Type запроса": [
          {
            "group": "Content-Type запроса",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Type ответа": [
          {
            "group": "Content-Type ответа",
            "type": "string",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": true,
            "field": "Content-Type",
            "description": "<p>Формат и способ представления сущности</p>"
          }
        ],
        "Content-Encoding": [
          {
            "group": "Content-Encoding",
            "type": "string",
            "allowedValues": [
              "\"gzip\"",
              "\"deflate\"",
              "\"identity\""
            ],
            "optional": true,
            "field": "Content-Encoding",
            "description": "<p>Способ кодирования содержимого сущности при передаче</p>"
          }
        ],
        "Origin": [
          {
            "group": "Origin",
            "type": "string",
            "optional": true,
            "field": "Origin",
            "description": "<p>Инициализировать получение прав на совместное использование ресурсов между разными источниками</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Payload Too Large 413": [
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "allowedValues": [
              "\"PAYLOAD_TOO_LARGE_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Payload Too Large 413",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "allowedValues": [
              "\"INTERNAL_SERVER_ERROR\""
            ],
            "optional": false,
            "field": "code",
            "description": "<p>Код ошибки</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Подробное описание ошибки</p>"
          }
        ]
      }
    }
  }
] });