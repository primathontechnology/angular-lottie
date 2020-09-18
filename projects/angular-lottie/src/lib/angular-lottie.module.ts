import { NgModule } from '@angular/core';
import { AngularLottieDirective } from './angular-lottie.directive';
import { ScriptLoaderService } from './script-loader.service';

@NgModule({
    declarations: [AngularLottieDirective],
    exports: [AngularLottieDirective],
    providers: [ScriptLoaderService],
})
export class AngularLottieModule {}
