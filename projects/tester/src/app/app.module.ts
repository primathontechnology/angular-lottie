import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// import { AngularLottieModule } from './../../../angular-lottie/src/public-api';
import { AngularLottieModule } from 'angular-lottie';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AngularLottieModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
