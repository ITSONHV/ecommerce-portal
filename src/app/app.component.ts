import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/models/category.model';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  public expenseObj : CategoryModel |any;
  constructor(private _mainsvc: MainService){}
  ngOnInit(): void {
   };
  title = 'ecommerce-portal';
}
