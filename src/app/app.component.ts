import { Component, OnInit,ViewChild  } from '@angular/core';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private _mainsvc: MainService){}
  ngOnInit(): void {
    
   };
  title = 'ecommerce-portal';
}
