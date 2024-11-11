import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// Se siamo in modalità di produzione, abilita il Production Mode

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
