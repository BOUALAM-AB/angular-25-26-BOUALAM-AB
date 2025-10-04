import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  log(nom: string, action: 'ajout'|'update'|'delete') {
    console.log(`assignment ${nom} ${action}`);
  }
}
