---
id: start-sdk
title: Import Sdk
---

This short tutorial will set you up to start using API Green SDK in a few minutes. If you want to learn more, proceed to Authentication and then to User Profile Setup part that will take you step by step through creating your full profile.

## First - Install via Npm

```
npm i api-green-node --save
```

## Import Sdk - ES6 module

```
import { Sdk } from 'api-green-node';
```

## Import Sdk - CommonJS2 (in e.g. node.js)

```
const { Sdk } = require('api-green-node');
```

## First instanciation

```
const sdk = new Sdk();
```
Here, you have your first instance of the Sdk. Now to access to API Green, it needs to be configured with your account informations and/or tokens, if you already have them. It's time to [authenticate!](authentication.md)   
