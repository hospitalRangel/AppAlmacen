import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PruebaGuard implements CanActivate {

  public isAdmin: any = null;
  public userUid: string = null;

  constructor(private AFauth: AngularFireAuth, private router: Router,  public authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.AFauth.authState.pipe(map(auth => {
      // tslint:disable-next-line: deprecation
              if (auth) {
                this.userUid = auth.uid;
                this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
                  this.isAdmin = Object.assign({}, userRole.rol).hasOwnProperty('admin');
                  console.log(Object.assign({}, userRole.rol).hasOwnProperty('admin'));
                });
                return true;
              } else {
                this.authService.AlertaSinPermiso();
                this.router.navigate(['/entrada']);
                return false;
              }
              // console.log(auth);
              // return false;
            }));
  }

  // this.authService.isAuth().subscribe(auth => {
  //   if (auth) {
  //     this.userUid = auth.uid;
  //     this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
  //       this.isAdmin = Object.assign({}, userRole.rol).hasOwnProperty('admin');
  //     });
  //   }
  // });
}
