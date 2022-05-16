

# API-KenzieFood

Nesse trabalho vocês terão que consumir uma API de produtos.

## Rotas

### Get `/product`

### Resposta: Status 200

```json

```
---

### Get `/product/:id`

### Regras:
Passar id do produto específico na url.


### Resposta: Status 200

```json
{
	"id": 5,
	"nome": "Panqueca de banana com aveia",
	"preco": 20,
	"categoria": "Panificadora",
	"imagem": "https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint4/img/capstone-images/panqueca.png",
	"createdAt": "2022-01-24T13:20:24.211Z",
	"updatedAt": "2022-01-24T13:20:24.211Z"
}

```
--- 
## Rotas extras
Em todas as rotas extras são autenticadas, por isso, é necessário enviar no header o token da sua respectiva equipe. Exemplo:

```javascript
fetch("https:urlDaApi", { headers : {Authorization: "Bearer tokenDaSuaEquipe"}} )
```
---

### Get `/my/product`
### Regras:
Essa rota retorna todos os produtos que foram criados utilizando o token de sua equipe. Exemplo?

### Resposta: Status 200
```json
[
	{
		"id": 3,
		"nome": "Bolinho",
		"preco": 5,
		"categoria": "Doce",
		"imagem": "https://picsum.photos/200/300",
		"createdAt": "2022-01-24T14:29:37.680Z",
		"updatedAt": "2022-01-24T14:29:37.680Z"
	},
	{
		"id": 4,
		"nome": "Temaki",
		"preco": 5,
		"categoria": "Comida Japonesa",
		"imagem": "https://picsum.photos/200/300",
		"createdAt": "2022-01-24T14:36:34.045Z",
		"updatedAt": "2022-01-24T14:41:38.740Z"
	}
]
```
---

### Get `/my/product/:id`
### Regras:
Passar id do produto específico na url.
### Resposta: Status 200
```json
{
	"id": 3,
	"nome": "Bolinho",
	"preco": 5,
	"categoria": "Doce",
	"imagem": "https://picsum.photos/200/300",
	"createdAt": "2022-01-24T14:29:37.680Z",
	"updatedAt": "2022-01-24T14:29:37.680Z"
}
```
---

### Post `/my/product`
### Regras:
- `nome` e `categoria`: precisam ser strings.
- `preco`: deve ser um número positivo.
- `imagem`: deve ser a url de alguma imagem.

```json
{
	"nome": "Bolinho",
	"preco": 5,
	"categoria": "Doce",
	"imagem": "https://picsum.photos/200/300"
}
```
### Resposta: Status 201 Created
```json
{
	"id": 4,
	"user_id": 2,
	"nome": "Bolinho",
	"preco": 5,
	"categoria": "Doce",
	"imagem": "https://picsum.photos/200/300",
	"ip_user": "143.208.126.11",
	"updatedAt": "2022-01-24T14:36:34.045Z",
	"createdAt": "2022-01-24T14:36:34.045Z"
}
```
---

### Patch `/my/product/:id`
### Regras:
- `nome` e `categoria`: precisam ser strings.
- `preco`: deve ser um número positivo.
- `imagem`: deve ser a url de alguma imagem.
- Passar id do produto específico na url.

### Requisição:
Enviar um JSON com pelo menos uma das informações do produto a ser alterada, exemplo:

```json
{
	"nome" : "Temaki"
}
```

### Resposta: Status 202 Accepted
```json
{
	"id": 4,
	"nome": "Temaki",
	"preco": 5,
	"categoria": "Doce",
	"imagem": "https://picsum.photos/200/300",
	"createdAt": "2022-01-24T13:51:16.525Z",
	"updatedAt": "2022-01-24T14:30:20.104Z"
}
```
---

### Delete `/my/product/:id`
### Regras:
Passar id do produto específico na url.
Essa rota não precisa de um body, apenas do id na url.
### Resposta: Status 204 No Content

