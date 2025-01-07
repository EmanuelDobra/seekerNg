import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatIcon, MatMenu],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
