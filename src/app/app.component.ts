import { Component } from '@angular/core';
import { GoogleTagsService } from './google-tags.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private gts: GoogleTagsService) {
   gts.EmitEvent({category: 'diagnostic', label: 'AppComponent', value: 1});
  }
}
