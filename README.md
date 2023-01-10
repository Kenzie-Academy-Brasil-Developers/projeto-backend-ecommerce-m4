
# 💻 Projeto-backend-ecommerce-m4


## :closed_lock_with_key: Rota de Login

🟢 **POST - /users**

* Rota para fazer login

**Request:**
````
{
  "email": string,
  "password": string
}
````

**Response:**
````
{
  "token": string
}
````

_______________________________________________________________________________________________________________________________________________________________________

## :boy: Rotas de usuário


🟢 **POST - /users**

* Rota para fazer registro do usuário.

**Request:**
````
{
  "name": string,
  "age": number,
  "email": string,
  "address": {
    "street": string,
    "city": string,
    "zipCode": string,
    "state": string,
     "number": string
  }
}

````

**Response:**
````
{
  "name": string,
  "age": number,
  "email": string,
  "isAdm": boolean,
  "createdAt": Date,
  "updatedAt": Date,
  "deletedAt": Date,
    "address": {
	"street": string,
	"city": string,
	"zipCode": string,
	"state": string,
	"number": string
     }
  }

````
_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /users**

* Rota para listar todos os usuário.

**Response:**
````
[
    {
    "id": string,
    "name": string,
    "age": number,
    "email": string,
    "isAdm": boolean,
    "createdAt": Date,
    "updatedAt": Date,
    "deletedAt": Date,
    "address": {
        "street": string,
        "city": string,
        "zipCode": string,
        "state": string,
        "number": string
    }
  }
  
]
````



_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /users/<id-User>**

* Rota para listar usuário específico.

**Response:**
````
{
  "id": string,
  "name": string,
  "age": number,
  "email": string,
  "isAdm": boolean,
  "createdAt": Date,
  "updatedAt": Date,
  "deletedAt": Date,
  "address": {
    "street": string,
    "city": string,
    "zipCode": string,
    "state": string,
    "number": string
   }
}
````


_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /user/<id-user>**

* Rota para atualizar dados do usuário.

**Request:**
``
{
  "name"?: string,
  "age"?: number,
  "email"?: string
}
``

**Response:**
````
{
  "id": string,
  "name": string,
  "age": number,
   "email": string,
  "isAdm": boolean,
  "createdAt": Date,
  "updatedAt": Date,
  "deletedAt": Date,
  "address": {
    "street": string,
    "city": string,
    "zipCode": string,
    "state": string,
    "number": string
  }
}
´´´´
_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - users/<user-Id>/address**

**Request:**
````
{
  "street"?: string,
  "city"?: string,
  "zipCode"?: string,
  "state"?: string,
  "number"?: string
}

````

**Response:**
````
"address": {
  "id": number,
  "street": string,
  "city": string,
  "zipCode": string,
  "state": string,
  "number": string
}

````

_______________________________________________________________________________________________________________________________________________________________________

## :radio: Rotas do Produto


🟢 **POST - /products**

*Registra produto

**Request:**
````
{
  "name": string,
  "description": string,
  "price": number,
  "amount": number,
  "avaible": boolean
}

````

**Response:**
````
{
  "id": number,
  "name": string,
  "description": string,
  "price": number,
  "amount": number,
  "available": boolean
}

````

_______________________________________________________________________________________________________________________________________________________________________


🔵 **GET - /products**

* Lista todos os produtos

**Response:**
````
{
  "id": number,
  "name": string,
  "description": string,
  "price": number,
  "amount": number,
  "available": boolean
}
````

_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /product/<id-Product>** 

*Atualiza um produto em específico

**Request:**
````
{
  "name": string,
  "description": string,
  "price": number,
  "amount": number,
  "avaible": boolean
}

````

**Response:**
````
{
  "id": number,
  "name": string,
  "description": string,
  "price": number,
  "amount": number,
  "available": boolean
}

````
_______________________________________________________________________________________________________________________________________________________________________

🔴 **DELETE - /products/<id-Product>**

*Deleta um produto.

_______________________________________________________________________________________________________________________________________________________________________

### :memo: Messagens do produto

🟢 **POST - /products/<product-Id>/comments**

* Cria um comentário no produto

**Request:**
````
{
  "comment_text": string
}

````

**Response:**
````
{
 "id": number,
 "comment_text": string,
 "createdAt": Date,
 "updatedAt": Date
}

````
_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /products/<id-Product>/comments**

* Lista todos os comantários de um produto.

**Response:**
````
[

  {
   "id": number,
   "comment_text": string,
   "createdAt": Date,
   "updatedAt": Date
  }

]


````

_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /products/<product-Id>/comments/<comment-Id>**

* Atualiza comentaria especifico de um produto

**Request:**
````
{
  "comment_text": string
}

````

**Response:**
````
{
 "id": number,
 "comment_text": string,
 "createdAt": Date,
 "updatedAt": Date
}

````

_______________________________________________________________________________________________________________________________________________________________________

🔴 **DELETE - /products/<product-Id>/comments/<comments-Id>**

 * Deleta comentario específico em um produto
 
_______________________________________________________________________________________________________________________________________________________________________

## :mega: Rotas para criar os pedidos

🟢 **GET - /orders**

* Lista todos os pedidios 

**Response:**
````
{
  "id": number,
  "ordered: Date,
  "deliveredAt: Date
}
````

_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /orders/<order-Id>**

* Atualizar um pedido específico

**Request:**
````
{
  "delivered": boolean
}
````

**Response:**
````
{
  "id": number,
  "ordered: Date,
  "deliveredAt: Date
}
````

_______________________________________________________________________________________________________________________________________________________________________


