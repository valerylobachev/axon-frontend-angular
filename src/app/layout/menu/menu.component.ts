import {Component, Input} from '@angular/core';
import {Menu} from './menu.model'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  @Input()
  menuItems: Menu[]

  constructor(
  ) {}


}
