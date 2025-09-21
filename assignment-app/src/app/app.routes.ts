import { Routes } from '@angular/router';
import { ListeDevoirsComponent } from './pages/liste-devoirs/liste-devoirs.component';
import { AjoutDevoirComponent } from './pages/ajout-devoir/ajout-devoir.component';
import { ModificationDevoirComponent } from './pages/modification-devoir/modification-devoir.component';
import { SuppressionDevoirComponent } from './pages/suppression-devoir/suppression-devoir.component';
import { GenerationDonneesComponent } from './pages/generation-donnees/generation-donnees.component';

export const routes: Routes = [
  { path: '', redirectTo: 'devoirs', pathMatch: 'full' },
  { path: 'devoirs', component: ListeDevoirsComponent },
  { path: 'ajout', component: AjoutDevoirComponent },
  { path: 'modification', component: ModificationDevoirComponent },
  { path: 'suppression', component: SuppressionDevoirComponent },
  { path: 'generation', component: GenerationDonneesComponent },
  { path: '**', redirectTo: 'devoirs' }
];
