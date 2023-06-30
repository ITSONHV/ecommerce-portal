import { AfterContentInit, Component, ElementRef, OnInit,ViewChild  } from '@angular/core';
import { MainService } from 'src/services/main.service';

import 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , AfterContentInit {
  constructor(private _mainsvc: MainService,public elementRef: ElementRef, ){}
  ngOnInit(): void {
    
   };
  title = 'ecommerce-portal';

  ngAfterContentInit (): void {


    //   let focusElement: HTMLElement = document.getElementById('jtv-best-sale-slider-items') as HTMLElement;

    //   (<any>jQuery(focusElement)).owlCarousel({
    //     items: 4, //10 items above 1000px browser width
    //     itemsDesktop: [1024, 4], //5 items between 1024px and 901px
    //     itemsDesktopSmall: [900, 3],
    //     itemsTablet: [640, 2],
    //     navigation: true,
    //     navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    //     slideSpeed: 500,
    //     pagination: false,
    //     autoPlay: true
    // });
    
    
  }
}
