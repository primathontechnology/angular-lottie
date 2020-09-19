# ![primathon logo](https://primathon.in/assets/img/logo-primathon.png) Lottie Animation Using Directive for Angular

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.14.

<br/>

## Install

```
npm i angular-lottie
```

## Usage

1. Install [Angular Lottie](https://www.npmjs.com/package/angular-lottie) into your project

    > npm i angular-lottie

1. Import `AngularLottieModule` inside your AppModule (`src/app/app.module.ts`)

1. Store Your Lottie Json Data in to a variable

    > const lottieJsonData = { v: '5.5.7', meta: { ... } }

## Examples

Apply Lottie Animation by adding directive:

```html
<section [angularLottie]="lottieJsonData"></section>
```

`or`

```html
<section
    [angularLottie]="lottieJsonData"
    [loop]="true / false / number"
></section>
```

## Demo

Demo url https://primathontech.github.io/angular-lottie/

## See also

Other [Web APIs for Angular](https://primathontech.github.io/) by [@primathontech](https://github.com/primathontech)
