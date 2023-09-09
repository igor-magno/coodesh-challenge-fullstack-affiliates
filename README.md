# Fullstack Afiliados

Este projeto oferece a funcionalidade de importar vendas e transações através de um arquivo no formato .txt. Além disso, ele também apresenta uma lista completa de todas as vendas e transações registradas, permitindo visualizar o saldo total em tempo real.

>  [Apresentação](https://www.loom.com/embed/498cefcae23f44f193e59840c526ac25)

### Segue a estrutura que o arquivo .txt deve obedecer

| Campo    | Início | Fim | Tamanho | Descrição                      |
| -------- | ------ | --- | ------- | ------------------------------ |
| Tipo     | 1      | 1   | 1       | Tipo da transação              |
| Data     | 2      | 26  | 25      | Data - ISO Date + GMT          |
| Produto  | 27     | 56  | 30      | Descrição do produto           |
| Valor    | 57     | 66  | 10      | Valor da transação em centavos |
| Vendedor | 67     | 86  | 20      | Nome do vendedor               |

### Tipos de transação

Esses são os valores possíveis para o campo Tipo:

| Tipo | Descrição         | Natureza | Sinal |
| ---- | ----------------- | -------- | ----- |
| 1    | Venda produtor    | Entrada  | +     |
| 2    | Venda afiliado    | Entrada  | +     |
| 3    | Comissão paga     | Saída    | -     |
| 4    | Comissão recebida | Entrada  | +     |

## Linguagens e Tecnologias
Para esse projeto utilizei uma mescla de tecnologias da família NodeJs e JavaScrit.
- Api
   - NodeJs
   - JavaScript
- Web (client/font end)
   - React
   - TypeScript
   - TailwindCss (Biblioteca de estilo)
- Banco de Dados
   - MySql

## Requisitos
- Docker

## Instalação
Para instalar o projeto basta seguir os passos abaixo:
- Obs.: Todos os comandos estão considerando um sistema Unix caso esteja utilizando outro tipo de sistema precisara adaptá-los.

Realize o clone ou download do projeto (Caso realize o download será necessário extrair o projeto antes do próximo passo).
```
git clone https://github.com/igor-magno/coodesh-challenge-fullstack-affiliates.git
```

Acesse a pasta do projeto.
```
cd coodesh-challenge-fullstack-affiliates
```

Crie uma cópia do arquivo api/.env.example com o nome de api/.env
```
cp api/.env.example api/.env
```

Execute o seguinte comando para executar a plicação em modo de desenvolvimento.
```
docker-compose -f docker-compose.dev.yml -d
```

Execute o seguinte comando para executar a plicação em modo de produção.
```
docker-compose -f docker-compose.prod.yml -d
```

Para ambos os modos de execução será necessário acessar o bash do contêiner da api e executar os comandos de migração e seeding para preparar o banco de dados.

- Ambiente de Produção:
```
npm run prod:db:migrate
npm run prod:db:seeder
```

- Ambiente de Desenvolvimento:
```
npm run dev:db:migrate
npm run dev:db:seeder
```

Realizados todos os passos acima, a aplicação deve estar disponível na porta 3000 para o cliente Web (front end) e na porta 3001 para a Api.

## Testes
Para rodar os teste do projeto é necessário acessar o bash do contêiner api e executar os seguintes comandos.
- Obs.: Os testes só rodam em ambiente de desenvolvimento

garanta que as tabelas existem no Banco de Dados:
```
npm run test:db:migrate
```

para rodar testes unitários e de integração:
```
npm run test
```

para rodar testes de ponta a ponta e2e:
```
npm run test:e2e
```

## Referencia
>  Este é um desafio de [Coodesh](https://coodesh.com/)
