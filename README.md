# Api Gateway Lambda Response (AGLaR)

This module simplifies responding for lambdas so instead of writing an object you can use dot notation and achieve 
the same outcome. 

## Install 
```shell
npm i @RedMunroe/aglar
```

## Import
```js
import AGLaR from '@RedMunroe/aglar' 
```

## Usage
```js
const responder = new AGLaR(); 
return responder.OK().header("some-header", "header-value").JSON({
    "user_id": "some-id-here" 
}).send()
```
