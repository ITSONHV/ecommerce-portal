import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  public sliders: any;
  public urlImg : string = environment.urlImg;
  public baseUrl: string = environment.baseUrl;
  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items: 4,
    dots: false,
    margin: 10,
    autoplayTimeout: 4000,
    autoplaySpeed: 3000,
    autoplay: true,
    navSpeed: 2500,
    navText: ["<a class=\"flex-prev\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>", "<a class=\"flex-next\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      640: {
        items: 1
      },
      900: {
        items: 1
      },
      1024: {
        items: 1
      }
    },
    nav: false
  }
  constructor(private _svc: MainService,
    private spinner: NgxSpinnerService, 
  ) {
  }
  ngOnInit(): void {
    this.getSliderLimitFromService(4)//lấy giới hạn 3 hình, này cần config
  }

  getSliderLimitFromService(limit: number) {
    this.spinner.show();
    this._svc.getSliderLimit(limit).subscribe(
      (respones: ObjectModel) => {
        this.sliders = respones?.data;
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  
  getUrl(url: string){
    if(url != '' && url != null)
    {
      return  `${this.baseUrl}${url}`
    }
  
  return '#';
  }
}