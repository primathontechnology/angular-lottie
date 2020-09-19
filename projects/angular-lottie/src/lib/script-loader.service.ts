import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import ScriptStore from './ScriptStore';

declare var document: any;

@Injectable()
export class ScriptLoaderService {
    private scripts: any = {};

    private isScriptLoaded$: BehaviorSubject<boolean>;

    constructor() {
        this.isScriptLoaded$ = new BehaviorSubject<boolean>(false);
        ScriptStore.forEach((script: any) => {
            this.scripts[script.name] = {
                loaded: false,
                ...script,
            };
        });
    }

    private setLoadStatus(loaded: boolean) {
        this.isScriptLoaded$.next(loaded);
    }

    public onLoad(): Observable<boolean> {
        return this.isScriptLoaded$.asObservable();
    }

    public loadScript(name: string) {
        const alreadyAdded = this.checkIfScriptIsAlreadyAdded(
            this.scripts[name].src
        );
        // resolve if already loaded
        if (!alreadyAdded) {
            // load script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = this.scripts[name].src;
            script.async = this.scripts[name].async;
            script.defer = this.scripts[name].defer;

            this.onLoadListner(name, script);

            document.getElementsByTagName('body')[0].appendChild(script);
        }
    }

    private onLoadListner(name: string, script: any) {
        if (script.readyState) {
            // For IE
            script.onreadystatechange = () => {
                if (
                    script.readyState === 'loaded' ||
                    script.readyState === 'complete'
                ) {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;

                    console.log('Lottie Script Loaded On IE');
                    this.setLoadStatus(true);
                }
            };
        } else {
            // Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                console.log('Lottie Script Loaded On Browser');
                this.setLoadStatus(true);
            };
        }
        script.onerror = () => {
            console.error('Lottie Script Load Fail');
            this.setLoadStatus(false);
        };
    }

    private checkIfScriptIsAlreadyAdded(scriptUrl: string): boolean {
        return !!document.querySelector(`script[src*="${scriptUrl}"]`);
    }
}
