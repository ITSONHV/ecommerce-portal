import { Component, HostListener, Inject, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MainService } from 'src/services/main.service';
import { DOCUMENT } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit  {

  constructor(private _mainsvc: MainService, private activatedRoute: ActivatedRoute,
    private router: Router, 
    @Inject(DOCUMENT) private document: Document,
    private spinner: NgxSpinnerService,
    ){}
  ngOnInit(): void {
   
   }
  
}
