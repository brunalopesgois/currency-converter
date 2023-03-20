# Converter API

## Descrição

Essa API tem como objetivo disponibilizar uma consulta de conversão de valor de um produto N. Ela terá como padrão a conversão para real, dólar, euro e rúpias indianas, porém será possível o cadastro de novas moedas. Ao informar o valor de um produto, o client terá como retorno a conversão desse valor nas moedas previamente cadastradas.

## Pré-requisitos
- Docker
- Docker compose

## Rodando a aplicação

```bash
$ docker compose up (opcional: -d)
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e
```

[MIT licensed](LICENSE)
