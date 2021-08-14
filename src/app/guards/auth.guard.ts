import { AuthService } from './../login/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  constructor(private AuthService:AuthService,private router:Router) { }

  canLoad(route: Route): Observable<boolean> | boolean {

    return this.verificarAcesso();

  }

  private verificarAcesso(){

    if(this.AuthService.usuarioAutenticado()){
      return true;
     }
     this.router.navigate(['/login']);
     return false;

    }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.verificarAcesso();
  }

}
