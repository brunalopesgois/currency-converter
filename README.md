# Converter API 💱

![Status](https://badgen.net/badge/api/down/red)

## Descrição

Essa API tem como objetivo disponibilizar uma consulta de conversão de valor de um produto N. Ela terá como padrão a conversão para real, dólar, euro e rúpias indianas, porém será possível o cadastro de novas moedas. Ao informar o valor de um produto, o client terá como retorno a conversão desse valor nas moedas previamente cadastradas.

Acesse em tempo real: [Link](https://converter-api.fly.dev/docs)

## Pré-requisitos

- Docker
- Docker compose

## Rodando a aplicação

```bash
$ docker compose up (opcional: -d)
```

A aplicação se encontrará disponível no endereço: **http://localhost:3010**

## Teste

Docker

```bash
$ cd scripts/
$ sudo chmod +x tests-without-yarn.sh
$ sh tests-without-yarn.sh
```

Local

> Obs: Para executar os testes localmente é necessário ter o node, npm e yarn instalados. Além disso, alterar os host names no arquivo .env

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e
```

## Informações adicionais

Acessar o swagger: [Link](http://localhost:3010/docs)

Outras documentações relevantes encontram-se no diretório: **/docs**

[MIT licensed](LICENSE)
