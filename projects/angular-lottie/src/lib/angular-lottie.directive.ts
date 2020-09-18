import { ScriptLoaderService } from './script-loader.service';
import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    Inject,
    Input,
    PLATFORM_ID,
    Renderer2,
} from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

@Directive({
    selector: '[angularLottie]',
})
export class AngularLottieDirective implements AfterViewInit {
    @Input() angularLottie: any;

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
        private renderer: Renderer2,
        private element: ElementRef,
        private scriptLoaderService: ScriptLoaderService
    ) {}

    ngAfterViewInit(): void {
        this.initLottie();
    }

    private initLottie() {
        if (isPlatformBrowser(this.platformId)) {
            this.scriptLoaderService.loadScript().then((data: any) => {
                console.log(data);
                if (data.loaded) {
                    const scriptText = this.getLottieScript();
                    this.addScriptToBody(scriptText);
                }
            });
        }
    }

    private addScriptToBody(scriptText: string) {
        const script = this.renderer.createElement('script');
        script.text = scriptText;
        const body = document.getElementsByTagName('body')[0];
        this.renderer.appendChild(body, script);
    }

    private getLottieScript() {
        const myId = uuidv4();
        this.renderer.setAttribute(this.element.nativeElement, 'id', myId);
        const lottieString = `var params = {
            container: document.getElementById('${myId}'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: ${JSON.stringify(this.angularLottie)},
        };

        var anim;
        anim = lottie.loadAnimation(params);`;

        return lottieString;
    }
}
