import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { debounceTime, filter } from 'rxjs';
import { TitlebarService } from '../../services/titlebar.service';
import { Location } from '@angular/common';

/**
 * 
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  showBackButton: boolean = false;

  /**
   * 
   * @param router 
   */
  constructor(
    private router: Router,
    private location: Location,
    public titleSvc: TitlebarService) {

  }

  /**
   * 
   */
  ngOnInit(): void {

    this.establishRouterGuard();
  }

  /**
   * 
   */
  private establishRouterGuard() {

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe(event => {
        const url = (event as NavigationEnd).url;
        this.showBackButton = (url !== '/' && url != '/weatherCurrent');
      });
  }

  public onGoBack() {

    this.location.back()
  }
}
