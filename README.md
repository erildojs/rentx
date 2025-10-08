## RentX — API de aluguel de carros

API REST construída com Node.js, TypeScript, Express, TypeORM e injeção de dependências com tsyringe. Autenticação com JWT (token e refresh token), upload, envio de e-mails e documentação via Swagger.

### Tecnologias
- **Runtime**: Node.js, TypeScript
- **Web**: Express, express-async-errors, Swagger UI
- **ORM**: TypeORM (PostgreSQL)
- **DI**: tsyringe
- **Auth**: JWT + Refresh Token
- **Utilitários**: multer, dayjs, class-transformer
- **Testes**: Jest, Supertest

### Requisitos
- Node.js (LTS)
- Yarn ou NPM
- PostgreSQL (local) ou Docker/Docker Compose

### Configuração do Banco
Por padrão (arquivo `ormconfig.json`):
- host: `localhost`
- port: `5432`
- username: `admin`
- password: `123`
- database: `rentx`

Você pode ajustar conforme necessário no `ormconfig.json`.

### Rodando com Docker
1. Suba os serviços:
```bash
docker-compose up -d --build
```
2. A API ficará disponível em `http://localhost:3333`.

### Rodando localmente (sem Docker)
1. Instale dependências:
```bash
npm install
# ou
yarn
```
2. Garanta que o PostgreSQL esteja executando e acessível conforme `ormconfig.json`.
3. Rode as migrations (se aplicável, via TypeORM CLI usando ts-node-dev):
```bash
npm run ty migration:run
# ou
yarn ty migration:run
```
4. Inicie o servidor em modo desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

### Scripts principais
- `dev`: inicia o servidor com ts-node-dev em `src/shared/infra/http/server.ts`.
- `ty`: executa a CLI do TypeORM com ts-node-dev (ex.: `yarn ty migration:run`).
- `test`: executa a suíte de testes (Jest).
- `sa`: roda a seed de admin (se existir em `src/shared/infra/typeorm/seed/admin.ts`).

### Testes
Execute:
```bash
npm test
# ou
yarn test
```

### Documentação (Swagger)
Após iniciar a API, acesse a documentação em:
- `http://localhost:3333/api-docs`

### Autenticação
Configurações em `src/config/auth.ts`:
- `secret_token`, `expires_in_token`
- `secret_refresh_token`, `expires_in_refresh_token`, `expires_refresh_token_days`

Fluxo de login: geração de `token` (acesso) e `refresh_token` persistido, com renovação via endpoint de refresh.

### Convenções e Arquitetura
- Resolução de paths do TypeScript configurada em `tsconfig.json` (aliases como `@modules/*`, `@shared/*`, `@config/*`).
- Container de IoC em `@shared/container` para registrar implementações dos repositórios e provedores.
- Migrations localizadas em `src/shared/infra/typeorm/migrations`.

### Variáveis de Ambiente (opcional)
Você pode utilizar `.env` (biblioteca `dotenv`) para parametrizar credenciais e URLs. Ajuste arquivos de configuração conforme necessário.

### Endpoints
- Consulte o Swagger em `/api-docs` para a lista completa de rotas, parâmetros e exemplos.

### Troubleshooting
- Erros com decorators/DI em testes: garanta que `reflect-metadata` seja carregado no ambiente de testes e que o Jest esteja usando o `tsconfig.json` do projeto.
- Conexão com o banco: verifique credenciais do PostgreSQL e se as migrations foram executadas.

### Licença
ISC — veja o arquivo `LICENSE` (se aplicável).


