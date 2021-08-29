import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Panel de control',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/tables', title: 'Ofertas',  icon:'ni-briefcase-24 text-red', class: '' },
    { path: '/user-profile', title: 'Perfil del usuario',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/login', title: 'Entrar',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Registro',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/supportCase', title: 'Soporte',  icon:'ni-support-16 text-orange', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
