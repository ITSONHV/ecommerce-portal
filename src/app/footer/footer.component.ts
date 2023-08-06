import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit  {
  public urlLogo ="./../assets/images/logo.jpg";
//   @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
public categories : any = [];
 public items : number[] = [1, 2, 3, 4];
  constructor() {}
  ngOnInit(): void {
    this.getCate ();
  }

  // slideConfig = {
  //   "slidesToShow": 4,
  //   "slidesToScroll": 1,
  //   "autoplay": false,
  //   "autoplaySpeed": 5000,
  //   // "mobileFirst": true,
  //   // "centerMode": true,
  //   "pauseOnFocus": false,
  //   "pauseOnHover": false,
  //   "swipeToSlide": false,
  //   // "variableWidth": false,
  //   // "enableCenterMode": true,
  //   "arrows": false,
  //   "responsive": [
  //     {
  //       "breakpoint": 1024,
  //       "settings": {
  //         "slidesToShow":1,
  //         "slidesToScroll": 1,
  //         "slidesPerRow": 1,
  //         "autoplay": false,
  //         "pauseOnFocus": false,
  //         "pauseOnHover": false,
  //         "swipeToSlide": false,
  //         "arrows": false,
  //       },
  //     },
  //   ],
  // };


//   display: any;
//   center: google.maps.LatLngLiteral = {
//       lat: 11.309700746462845,
//       lng:  106.1020562506761
//   };
//   zoom = 18;
//   markerPositions: google.maps.LatLngLiteral[] = [];
//   addMarker(event: google.maps.MapMouseEvent) {
//     if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
//   }
// openInfoWindow(marker: MapMarker) {
//     if (this.infoWindow != undefined) this.infoWindow.open(marker);
// }
 getCate (){
  if (localStorage.getItem('allmenu-app')?.length != 0) {
    //localStorage.removeItem('allmenu-app');
    this.categories = JSON.parse(localStorage.getItem('allmenu-app')??"");
  }
 }
}
