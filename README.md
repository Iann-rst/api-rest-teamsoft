# API REST - TEAM SOFT

Backend em NodeJs para criar as operações básicas de Cadastro, Leitura, Alteração e Remoção de Clientes com endereço. Construir 2 entidades separadas, um cliente pode ter mais de um endereço, em uma API REST;

## Executando o projeto

Abaixo seguem as instruções para executar o projeto na sua máquina.

Comece clonando o repositório e instalando suas dependências:

```sh
git clone https://github.com/Iann-rst/api-rest-teamsoft.git
cd api-rest-teamsoft
npm install
```

### Banco de dados MySQL

Foi utilizado o banco de dados mysql e **recomendo** o uso do Docker para executar o banco de dados na sua máquina.

> Você pode instalar o Docker seguindo [a documentação oficial](https://docs.docker.com/desktop/)

Após instalar o Docker, deve configurar a variável de ambiente **DATABASE_URL**, subir o serviço do banco de dados e então subir o servidor HTTP.

```sh
# Copiar o arquivo com os dados de conexão e variáveis ambiente
cp .env.example .env

# Subir o serviço do Banco MySQL via docker
docker compose up -d
# ou
docker-compose up -d

# Subir o servidor HTTP
npm run start:dev

# Em outro terminal, aberto na pasta da API. Execute o comando para criação das tabelas no banco de dados
# OBS: Possa ser que demore alguns minutos para o container do banco de dados mysql está pronto para utilizar
npx prisma migrate dev
```

### Estrutura da API

Para entender melhor sobre os scripts e funcionamento da API você tem algumas opções:

- **Swagger**: Você pode acessar a documentação da API, basta acessar a rota /api-docs;
- **Beekeeper**: Para visualização dos dados no banco de dados;
- **Prisma Studio**: Caso prefira outra forma de visualizar os dados do banco de dados, basta acessar a pasta da API pelo terminal e executar o comando ```npx prisma studio```. Dessa forma, você vai conseguir ver as tabelas e registros na url **http://localhost:5555/**;
- **Insomnia**: Caso queira interagir com a API, você pode utilizar um API Rest Client como o Insomnia;
- **Teste Unitários**: Para executar os testes unitários, basta executar o comando ```npm run test``` no terminal;
- **Coverage Testes Unitários**: Para visualizar o coverage dos testes unitários, basta executar o comando ```npm run test:coverage```;
- **Vitest UI**: A ferramenta de testes Vitest, permite visualizar os teste e interagir com os mesmos via interface do usuário. Basta executar no terminal o comando: ```npm run test:ui```;

