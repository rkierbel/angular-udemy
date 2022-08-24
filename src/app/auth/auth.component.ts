import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder.directive";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app-reducer";
import * as AuthActions from "../auth/store/auth-actions";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  isLoginMode: boolean = true;
  // @ts-ignore
  error: string = null;
  // @ts-ignore
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  alertSub?: Subscription;
  private storeSub?: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private cmpFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.alertSub)
      this.alertSub.unsubscribe();
    if (this.storeSub)
      this.storeSub.unsubscribe();
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f: NgForm) {
    if (!f.valid) return;
    const email = f.value.email;
    const password = f.value.password;

    // let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.auth.login(email, password);
      this.store.dispatch(new AuthActions.AuthStart({
        email: email,
        password: password
      }));
    } else {
      // authObs = this.auth.signUp(email, password);
      this.store.dispatch(new AuthActions.SignUpStart({
        email: email,
        password: password
      }))
    }

    f.reset();

    /*authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        console.log(error);
        this.error = error;
        this.showErrorAlert(error);
        this.isLoading = false;
      }
    );*/
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(error: string) {
    const alertCmpFactory = this.cmpFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = error;
    this.alertSub = componentRef.instance.close.subscribe(() => {
      this.alertSub?.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
