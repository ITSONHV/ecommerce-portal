import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {
  isLoadComplete = true;
  public listProduct : any ;
  public urlImg : string = environment.urlImg;
  public categoryId : any ;
  constructor(private _svc : MainService,private _router: ActivatedRoute,private spinner: NgxSpinnerService, ) {
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
}
