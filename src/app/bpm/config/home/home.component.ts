import { Component, OnInit } from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core/index';

@Component({
  selector: 'axon-bpm-config-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor() { }

  ngOnInit() {
  }

}
