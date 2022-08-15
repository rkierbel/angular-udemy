import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder.directive";

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

  constructor(private auth: AuthService,
              private router: Router,
              private cmpFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.alertSub)
      this.alertSub.unsubscribe();
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f: NgForm) {
    if (!f.valid) return;
    const email = f.value.email;
    const password = f.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.auth.login(email, password);
    } else {
      authObs = this.auth.signUp(email, password);
    }

    authObs.subscribe(
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
    );

    f.reset();
  }

  onHandleError() {
    // @ts-ignore
    this.error = null;
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
