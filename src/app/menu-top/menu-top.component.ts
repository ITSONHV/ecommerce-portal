import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {
  public isHidden = false;
  ngOnInit(): void {
    document.getElementById('sample_id')?.setAttribute('style', "block"); 
  }
  toggleHandle(): void{
    debugger
    this.isHidden = true;
  }
}
