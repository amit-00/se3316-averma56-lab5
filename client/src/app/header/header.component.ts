import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSub: Subscription;
  isAuth: boolean = false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatus()
      .subscribe(isAuthenticated => {
        this.isAuth = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
