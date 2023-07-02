import { CarouselComponent, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { AfterViewInit, Component, Input, OnInit, ViewChild,  } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'carousel-holder-product-sale',
    templateUrl: 'carousel-holder.component.html',
})
export class CarouselHolderComponent implements OnInit {
    @Input() listProduct: any;
    public products: any;
    public urlImg: string = environment.urlImg;
    customOptions: OwlOptions;

    constructor() {
    }

    ngOnInit(): void {    
        this.customOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: true,
        navSpeed: 700,
        items: 4,
        animateOut: 'slideOutDown',
        animateIn: 'slideInDown',
        // center: false,
        // autoWidth: true,
        // autoHeight: true,
        autoplay: true,
        navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
        responsive: {
            0: {
                items: 2,
            },
            400: {
                items: 3,
            },
            760: {
                items: 4,
                
            },
            940: {
                items: 5,
            }
        },
        nav: false,
      }
    
    }

    @ViewChild('owlCar') carouselEl: CarouselComponent;
    ngAfterViewChecked() {
       //console.log(this.carouselEl?.slidesData);
    }
    
}