# Beaudio To-Do API

API RESTful para gerenciamento de tarefas com autenticação JWT, múltiplas listas e integração com PostgreSQL.

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```sh
git clone https://github.com/seu-usuario/beaudio_teste_api.git
cd beaudio_teste_api
```

### 2. Instale as dependências

```sh
npm install
```

### 3. Configure o banco de dados

- Crie um banco PostgreSQL local chamado `be_audio` (exemplo: usando Docker ou pgAdmin).
- Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/be_audio"
JWT_SECRET="sua_chave_jwt_super_secreta"
```

### 4. Rode as migrations do Prisma

```sh
npx prisma migrate dev
```

### 5. Inicie a API

```sh
npm run dev
```

A API estará disponível em [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Configurando o CORS

Se o seu frontend **não** estiver rodando em `http://localhost:5173`, edite o arquivo em `/config/cors.js` e altere a linha:

```js
const corsOptions = {
  origin: 'http://localhost:5173', // Altere para a URL do seu frontend
};
```

Coloque a URL correta do seu frontend, por exemplo: `http://localhost:8080` ou o domínio em produção.

---

## 📚 Documentação

Acesse a documentação interativa do Swagger em:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📝 Tecnologias

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Swagger
