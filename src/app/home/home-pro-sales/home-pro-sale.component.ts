import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import 'jquery';
@Component({
  selector: 'app-home-pro-sale',
  templateUrl: './home-pro-sale.component.html',
  //styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeProSaleComponent implements OnInit {
  @Input() listProduct : any;
  isLoadComplete = true;
  public urlImg : string = environment.urlImg;
  constructor(private _svc : MainService,private _router: ActivatedRoute,private spinner: NgxSpinnerService,public elementRef: ElementRef, ) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.isLoadComplete = false;
  }
 
}
