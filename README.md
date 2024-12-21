# Impersonated proxy server (serverless-curl-impersonate) (serverless + docker + express + proxy + curl-impersonate)

Impersonated proxy server:

- bypass TLS fingerprinting anti-bot protection https://dev.to/logrocket/using-curl-impersonate-in-nodejs-to-avoid-blocks-49n2
- written in Nodejs/Express
- see working Docker image
- see example of serverless configuration

## Getting started

```sh
pnpm yc:registry:create
pnpm yc:registry:configure

pnpm yc:ci
```

## Example

Example of the deployed curl-impersonate proxy

https://bba5fcsqp561u8p04cfd.containers.yandexcloud.net/https://google.com

