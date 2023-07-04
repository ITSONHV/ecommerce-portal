import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/services/main.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private _mainsvc: MainService, private activatedRoute: ActivatedRoute,){}
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => console.log(url))
   };
  title = 'ecommerce-portal';
}
