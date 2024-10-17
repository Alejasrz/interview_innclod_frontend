import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {


  constructor(private _authService: AuthService,
              private router: Router
  ){

  }

  ngOnInit(){
    
  }

  onLogout(){
    this._authService.removeLocalStorage();
    this.router.navigate(['/login']);
  }
}
