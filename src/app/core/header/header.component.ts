import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../shared/data-storage.service";
import {AuthService} from "../../auth/auth.service";
import {map, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app-reducer';
import * as fromAuthActions from '../../auth/store/auth-actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  userSub?: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
              private auth: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !user ? false : true;
        console.log(!user);
        console.log(!!user);
      });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut() {
    // this.auth.logOut();
    this.store.dispatch(new fromAuthActions.Logout());
  }
}
