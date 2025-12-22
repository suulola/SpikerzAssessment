import { Routes } from '@angular/router';
import { AppShellComponent } from './features/shell/app-shell.component';
import { PlaceholderPageComponent } from './features/shell/placeholder-page/placeholder-page.component';
import { NotFoundComponent } from './features/shell/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', redirectTo: 'vulnerabilities', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: PlaceholderPageComponent
      },
      {
        path: 'vulnerabilities',
        loadChildren: () => import('./features/vulnerabilities/vulnerabilities.routes')
          .then(m => m.VULNERABILITIES_ROUTES)
      },
      { path: 'threat-scenarios', component: PlaceholderPageComponent },
      { path: 'inventory', component: PlaceholderPageComponent },
      { path: 'integration', component: PlaceholderPageComponent },
      { path: 'policy', component: PlaceholderPageComponent },
      { path: 'report', component: PlaceholderPageComponent },
      { path: 'settings', component: PlaceholderPageComponent },
      { path: 'notifications', component: PlaceholderPageComponent },
      { path: '**', component: NotFoundComponent }
    ]
  }
];
