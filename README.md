# 💻 Projeto-backend-ecommerce-m4

#### :heavy_exclamation_mark: **URL:** https://projeto-m4-kidn.onrender.com/ :heavy_exclamation_mark: 

**Conta de Admin:**
````
{
  email: admin@admin.com 
  password: 1234
}

````

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
  "password": string
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
    "email": email,
    "age": number,
    "address": {
        "id": number,
        "street": string,
        "city": string,
        "state": string,
        "zipCode": string,
        "number": string
    },
    "id": string,
    "createdAt": Date,
    "updatedAt": Date
 }

````

_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /users**

* Rota para listar todos os usuário. :heavy_exclamation_mark: **(Rota de admin)** 

**Response:**
````
[
  {
    "id": string,
    "name": string,
    "email": string,
    "age": number,
    "createdAt": date,
    "updatedAt": date,
    "address": {
      "id": number,
      "street": string,
      "city": string,
      "state": string,
      "zipCode": string,
      "number": string
    }
  }
]

````
_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /users/id-User**

* Rota para listar usuário específico se for Admin. :heavy_exclamation_mark: **(para listar o próprio usuário não precisa ser admin)**

**Response:**
 ````
{
  "id": string,
  "name": string,
  "email": string,
  "age": number,
  "createdAt": date,
  "updatedAt": date,
  "address": {
    "id": number,
    "street": string,
    "city": string,
    "state": string,
    "zipCode": string,
    "number": string
   }
}
````

_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /user/id-user**

* Rota para atualizar dados do usuário. :heavy_exclamation_mark: **(Só é permitido atualizar os próprios dados, mas se for admin, pode alterar os dados de qualquer usuário)**

**Request:**
````
{
  "name"?: string,
  "age"?: number,
  "email"?: string
}
````

**Response:**
 ````
{
	"id": string,
	"name": string,
	"email": string,
	"age": number,
	"createdAt": date,
	"updatedAt": date,
	"isAdm": boolean,
	"deletedAt": date | null
}
````
_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /address**

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

🔴 **DELETE - /users/id-user**

* Deleta usuário. :heavy_exclamation_mark: **(Só é permitido excluir os próprios dados, mas se for admin, pode excluir qualquer usuário)**

_______________________________________________________________________________________________________________________________________________________________________

## :radio: Rotas do Produto


🟢 **POST - /products**

*Registra produto **(Rota para admin)**

**Request:**
````
{
  "name": string,
  "description": string,
  "price": number,
  "stock": number,
}

````

**Response:**
````
{
  "id": number,
  "name": string,
  "description": string,
  "price": number,
  "stock": number,
  "available": boolean
}

````

_______________________________________________________________________________________________________________________________________________________________________


🔵 **GET - /products**

* Lista todos os produtos

**Response:**
````
[
   {
     "id": number,
     "name": string,
     "description": string,
     "price": number,
     "stock": number,
     "available": boolean
   }
]

````

_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /products/id-product**

* Lista um comantario pelo id

**Response:**
````
{
  "id": number,
  "name": string,
  "description": string,
  "price": number,
  "stock": number,
  "available": boolean
}
````

_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /product/id-Product** 

*Atualiza um produto em específico :heavy_exclamation_mark: **(Rota para admin)**

**Request:**
````
{
  "name"?: string,
  "description"?: string,
  "price"?: number,
  "stock"?: number,
  "available"/: boolean
}

````

**Response:**
````
{
  "id": number,
  "name": string,
  "description": string,
  "price": number,
  "stock": number,
  "available": boolean
}

````
_______________________________________________________________________________________________________________________________________________________________________

🔴 **DELETE - /products/id-Product**

*Deleta um produto. :heavy_exclamation_mark: **(Rota para admin)**

_______________________________________________________________________________________________________________________________________________________________________

### :memo: Messagens do produto

🟢 **POST - /products/product-Id/comments**

* Cria um comentário no produto

**Request:**
````
{
  "comment_text": string
}

````

**Response:**
````
 "comments_text": string,
  "user": {
      "id": string,
      "name": string,
      "email": string,
      "password": string,
      "age": number,
      "createdAt": Date,
      "updatedAt": Date,
      "isAdm": true,
  },
  "product": {
      "id": number,
      "name": string,
      "description": string,
      "price": number,
      "amount": number,
      "available": boolean
  },
  "deletedAt": null | Date,
  "id": number,
  "createdAt": Date,
  "updatedAt": Date
}

````
_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /products/id-Product/comments**

* Lista todos os comantários de um produto.

**Response:**
````
[
  {
    "id": number,
    "name": string,
    "description": string,
    "price": number,
    "amount": number,
    "available": boolean,
    "comments": [
      {
        "id": number,
        "comments_text": string,
        "createdAt": Date,
        "updatedAt": Date,
      },
      {
       "id": number,
        "comments_text": string,
        "createdAt": Date,
        "updatedAt": Date,
      },
      {
        "id": number,
        "comments_text": string,
        "createdAt": Date,
        "updatedAt": Date,
      }
    ]
  }
]
````
_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /products/comments/comment-Id**

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
 "deletedAt": Date
}
````
_______________________________________________________________________________________________________________________________________________________________________

🔴 **DELETE - /products/comments/comments-Id**

 * Deleta comentario específico em um produto
 
_______________________________________________________________________________________________________________________________________________________________________

## :mega: Rotas para criar os pedidos

🟢 **POST - /orders**

* Cria Pedidos

**Request:**
````
[
 {
  "product": number,
  "amount": number    
 }
]

````

**Response:**
````
{message: string}
````
_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /orders**

*  Lista todos os pedidos :heavy_exclamation_mark: **(Rota para admin)**

**Response:** 
````
[
  {
    "id": number,
    "orderedAt": date,
    "delivered": boolean
  }
]
````
_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /orders/products/user**
*  Lista todos os pedidios com os produtos do usuário logado

**Response:**
````
[
  {
    "delivered": boolean,
    "id": number,
    "orderedAt": date,
    "ordersProducts": [
	{
	  "id": number,
	  "amount": number,
	  "product": {
	     "id": number,
	     "name": string,
	     "description": string,
	     "price": string,
	     "stock": number,
	     "available": boolean
	   }
         },
	 {
          "id": number,
	  "amount": number,
	  "product": {
	     "id": number,
	     "name": string,
	     "description": string,
	     "price": string,
	     "stock": number,
	     "available": boolean
            } 
	  }
        ]
   ]
````

_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /orders/id-order**

*  Lista todos os produtos de um pedido :heavy_exclamation_mark: **(Rota para admin)**

**Response:**
````
[
 {
   "id": number,
   "orderedAt": Date,
   "delivered": boolean,
   "ordersProducts": [
     {
       "id": number,
       "amount": number,
       "product": {
         "id": number,
         "name": string,
         "description": string,
         "price": number,
         "amount": number,
         "available": boolean
        }
      },
      {
       "id": number,
       "amount": number,
       "product": {
         "id": number,
         "name": string,
         "description": string,
         "price": number,
         "amount": number,
         "available": boolean
        }
      }
    ]
  }
]

````

_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /orders/order-Id**

* Atualizar um pedido específico :heavy_exclamation_mark: **(Rota para admin)**

**Response:**
````
{
  "id": number,
  "orderedAt: Date,
  "delivered: boolean
}
````
_______________________________________________________________________________________________________________________________________________________________________
