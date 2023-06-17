import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {
  public isHidden = false;
  public menuObject : any;
  comment: string = "";
  constructor(private _mainsvc: MainService){}
  ngOnInit(): void {
    document.getElementById('sample_id')?.setAttribute('style', "block"); 
    this._mainsvc.getCategories().subscribe(
      (data: any) => {
          this.menuObject = data.data.filter(
            (menu : any) => { return menu.categoryParent == null ||  menu.categoryParent == 0} 
          )
        console.log(this.menuObject);
      }
    )
    
  }
  // flatten(items: []): any {
  //   const flat = "";
  //   items.forEach((item :any) => {
  //     if (item.categoryParent) {
  //       this.comment = `<li><a routerLink='/'>${item.categoryName}</a><div>
  //                           <div class="wrap-popup column1">
  //                               <div class="popup">
  //                                 <ul class="nav">
  //                                     <li><a href="index.html"><span>${...this.flatten(item)}</span></a></li>
  //                                 </ul>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         </li>`
  //      // flat.push(...this.flatten(item));
  //     } else {
  //       flat.push(item);
  //     }
  //   });
  //   return flat;
  // }
  // <li>
  //   <a routerLink="/">{{item.categoryName}}</a>
  //   <div class="wrap-popup column1">
  //     <div class="popup">
  //       <ul class="nav">
  //         <li><a href="index.html"><span>Home Version 1</span></a></li>
  //         <li><a href="version2/index.html"><span>Home Version 2</span></a></li>
  //         <li><a href="version3/index.html"><span>Home Version 3</span></a></li>
  //         <li><a href="version4/index.html"><span>Home Version 4</span></a></li>
  //       </ul>
  //     </div>
  //   </div>
  // </li>
  toggleHandle(): void{
    debugger
    this.isHidden = true;
  }
}
