import { Injectable } from '@angular/core';
import ScriptStore from './ScriptStore';

declare var document: any;

@Injectable()
export class ScriptLoaderService {
    private script: any = { ...ScriptStore, loaded: false };

    public loadScript() {
        return new Promise((resolve) => {
            // resolve if already loaded
            if (this.script.loaded) {
                resolve({
                    script: this.script.name,
                    loaded: true,
                    status: 'Already Loaded',
                });
            } else {
                // load script
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.script.src;
                script.async = this.script.async;
                script.defer = this.script.defer;
                if (script.readyState) {
                    // For IE
                    script.onreadystatechange = () => {
                        if (
                            script.readyState === 'loaded' ||
                            script.readyState === 'complete'
                        ) {
                            script.onreadystatechange = null;
                            this.script.loaded = true;
                            resolve({
                                script: this.script.name,
                                loaded: true,
                                status: 'Loaded',
                            });
                        }
                    };
                } else {
                    // Others
                    script.onload = () => {
                        this.script.loaded = true;
                        resolve({
                            script: this.script.name,
                            loaded: true,
                            status: 'Loaded',
                        });
                    };
                }
                script.onerror = () =>
                    resolve({
                        script: this.script.name,
                        loaded: false,
                        status: 'Loaded',
                    });

                document.getElementsByTagName('body')[0].appendChild(script);
            }
        });
    }
}
