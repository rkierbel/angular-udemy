import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../shared/data-storage.service";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

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
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
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
}
