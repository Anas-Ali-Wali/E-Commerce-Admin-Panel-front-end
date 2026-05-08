import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.css']
})
export class SettingsLayoutComponent {
menuItems = [
    { label: 'General Settings',     icon: 'bi-gear',    route: 'general' },
    { label: 'Theme Changes',         icon: 'bi-palette', route: 'theme'   },
    { label: 'Social Media',          icon: 'bi-share',   route: 'social'  },
    { label: 'Website Slider/Banner', icon: 'bi-images',  route: 'slider'  },
  ];

}
