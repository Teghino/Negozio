import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { StepperVerticalExample } from "../login/stepper.component";
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from "../toolbar/toolbar.component";


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    standalone: true,
    imports: [
        NgIf,
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        MatDividerModule,
        BrowserAnimationsModule,
        MatIconModule,
        StepperVerticalExample,
        RouterModule,
        ToolbarComponent
    ]
})
export class SidenavComponent {
[x: string]: any;
  elementi = ['home', 'person', 'settings'];
  routeLinks = [ '/', '/person', '/settings'];
}
