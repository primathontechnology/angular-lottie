import { ScriptLoaderService } from './script-loader.service';
import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    PLATFORM_ID,
    Renderer2,
} from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[angularLottie]',
})
export class AngularLottieDirective implements AfterViewInit, OnDestroy {
    @Input() angularLottie: any;
    // loop : true / false / number
    @Input() loop: any = true;
    // autoplay: true / false it will start playing as soon as it is ready
    @Input() autoPlay: any = true;

    private readonly scriptName = 'lottie';

    private sub$: Subscription;

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
        private renderer: Renderer2,
        private element: ElementRef,
        private scriptLoaderService: ScriptLoaderService
    ) {}

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId) && this.angularLottie) {
            this.sub$ = this.scriptLoaderService
                .onLoad()
                .subscribe((loaded: boolean) => {
                    if (loaded) {
                        const scriptText = this.getLottieScript();
                        this.addScriptToBody(scriptText);
                    } else {
                        this.initLottie();
                    }
                });
        }
    }

    private initLottie() {
        if (isPlatformBrowser(this.platformId)) {
            this.scriptLoaderService.loadScript(this.scriptName);
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
        return `lottie.loadAnimation({
            container: document.getElementById('${myId}'),
            renderer: 'svg',
            loop: ${this.loop},
            autoplay: ${this.autoPlay},
            animationData: ${JSON.stringify(this.angularLottie)},
        });`;
    }

    ngOnDestroy(): void {
        if (this.sub$) {
            this.sub$.unsubscribe();
        }
    }
}
