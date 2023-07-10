import { Component, NgZone, HostListener } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'scroll-top',
  templateUrl: 'scrollTop.component.html',
  styleUrls: ['scrollTop.component.css']
})
export class ScrollTopComponent {
  display: boolean;
  private timer: any;
  private loop: number = 0;
  private readonly minimumDistance: number = 400;

  readonly scrollOffset: number = 5;
  readonly scrollInterval: number = 10;

  constructor(private router: Router,
    private zone: NgZone,) { }

  ngOnInit() {
  }

  @HostListener("window:scroll", [])
  onScroll() {
    let scrollPosition = window.pageYOffset;
    this.handleScroll(scrollPosition);
  }

  moveToTop() {
    this.scrollToTop();
    this.handleScroll(0);
  }

  private handleScroll(scrollPosition : any) {
    this.zone.run(() => this.display = scrollPosition >= this.minimumDistance);
  }

  private scrollToTop() {
    this.loop++;
    let scrollPosition = window.scrollY;
    scrollPosition -= (this.loop * this.scrollOffset);
    window.scrollTo(0, scrollPosition);
    if (scrollPosition > 0) {
      this.timer = setTimeout(() => this.scrollToTop(), this.scrollInterval);
    } else {
      this.loop = 0;
      clearTimeout(this.timer);
    }

  }
}
