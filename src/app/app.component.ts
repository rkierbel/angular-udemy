import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {LoggingService} from "./logging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  constructor(private auth: AuthService,
              private logger: LoggingService) {
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit(): void {
    this.auth.autoLogin();
    this.logger.printLog("Hello from AppComponent ngOnInit");
  }


}
