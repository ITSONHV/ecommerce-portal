import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  public expenseObj : any = null;
  constructor(private _mainsvc: MainService){}
  ngOnInit(): void {
    this._mainsvc.getExpense().subscribe(
      (data: any) => {
          this.expenseObj = { ...data }
      }
    )};
  title = 'ecommerce-portal';
}
