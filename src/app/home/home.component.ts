import { AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import  'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit , AfterViewInit{
  isLoadComplete = true;
  public listProduct : any ;
  public urlImg : string = environment.urlImg;
  public categoryId : any ;
  constructor(private _svc : MainService,private _router: ActivatedRoute,private spinner: NgxSpinnerService,public elementRef: ElementRef, ) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getProductPages();  
    this.isLoadComplete = false;
  }
  getProductPages()  {this._svc.getProductPages().subscribe(
    (respones: ObjectModel)=>{
      this.listProduct = respones.data;
      console.log(this.listProduct);
      this.spinner.hide();
    },
    (err) =>{
      console.log(err);
      this.spinner.hide();
    }
  );
    // setTimeout(()=>{                          
      
    // }, 3000);
    
  }
  ngAfterViewInit(): void {
    // (<any>$(this.elementRef.nativeElement)).somePlugin();
     (<any>$("#jtv-best-sale-slider-items")).owlCarousel({
       items: 4, //10 items above 1000px browser width
       itemsDesktop: [1024, 4], //5 items between 1024px and 901px
       itemsDesktopSmall: [900, 3],
       itemsTablet: [640, 2],
       navigation: true,
       navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
       slideSpeed: 500,
       pagination: false,
       autoPlay: true
   });
   }
}
