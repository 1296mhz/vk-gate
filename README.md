## Vk gate

Заказ товаров через сообщения vk.com

## Установка

```sh
$ npm install
```
## Наполнение тестовыми товарами

```sh
$ node populate/populateProduct.js
```
## Настройки путей к бд и токен для VK API

```
{
  "dbAppURI": "mongodb://localhost/vkApiGate",
  "dbLogURI": "mongodb://localhost/vkApiGateLog",
  "vkToken": ""
}
```

## Запуск 

```sh
$ npm start
```

### Комманды

| Комманда               | Описание                | 
|:-----------------------|:------------------------| 
| помощь                 | получение помощи        | 
| список                 | получить список товаров |
| купить Название товара | купить указанный товар  |
| статус                 | статус заказа           |





