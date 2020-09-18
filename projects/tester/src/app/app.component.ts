import { Component } from '@angular/core';
import LottieDataOne from './LottieDataOne';
import LottieDataTwo from './LottieDataTwo';
import LottieDataThree from './LottieDataThree';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public lottieDataOne = LottieDataOne;
    public lottieDataTwo = LottieDataTwo;
    public lottieDataThree = LottieDataThree;

    public title = 'tester';
}
