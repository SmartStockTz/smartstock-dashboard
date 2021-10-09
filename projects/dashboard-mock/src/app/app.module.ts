import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login.page';
import {WelcomePage} from './pages/welcome.page';
import {AuthGuard} from './guards/auth.guard';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfigsService, IpfsService} from '@smartstocktz/core-libs';
import {init} from 'bfast';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';


const routes: Routes = [
  {
    path: '', component: WelcomePage
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../../dashboard/src/public-api').then(mod => mod.DashboardModule)
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBottomSheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly configsService: ConfigsService) {
    IpfsService.getVersion().then(value => {
      console.log('ipfs service is ', value.version);
    }).catch(console.log);
    init({
      applicationId: 'smartstock_lb',
      projectId: 'smartstock'
    });
    this.configsService.addMenu({
      name: 'dashboard',
      link: '/dashboard',
      icon: 'dashboard',
      roles: ['admin'],
      pages: []
    });
    this.configsService.selectedModuleName = 'dashboard';
  }
}
