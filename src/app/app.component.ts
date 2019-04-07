import { Component, VERSION, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeStorage, DocsSiteTheme } from 'src/services/theme-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  version = VERSION;
  theme: DocsSiteTheme;
  themeChangerButton: string;
  constructor(
    private overlay: OverlayContainer,
    private themeStorage: ThemeStorage
  ) { }

  themes: DocsSiteTheme[] = [
    { name: 'light-theme' },
    { name: 'dark-theme' }
  ];

  ngOnInit() {
    this.installTheme(this.themeStorage.getStoredThemeName());
  }

  installTheme(themeName: string) {
    this.theme = this.themes.find(theme => theme.name === themeName);

    if (!this.theme) {
      return;
    }

    if (this.theme.name === 'dark-theme') {
      this.overlay.getContainerElement().classList.remove('light-theme' || '');
      document.body.classList.remove('light-theme');
      this.overlay.getContainerElement().classList.add('dark-theme');
      document.body.classList.add('dark-theme');
      this.themeChangerButton = 'Light';
    } else {
      this.overlay.getContainerElement().classList.remove('dark-theme' || '');
      document.body.classList.remove('dark-theme');
      this.overlay.getContainerElement().classList.add('light-theme');
      document.body.classList.add('light-theme');
      this.themeChangerButton = 'Dark';
    }

    if (this.theme) {
      this.themeStorage.storeTheme(this.theme);
    }
  }

  toggleTheme() {
    this.themeStorage.clearStorage();
    if (this.overlay.getContainerElement().classList.contains('dark-theme')) {
      this.overlay.getContainerElement().classList.remove('dark-theme');
      this.overlay.getContainerElement().classList.add('light-theme');
      this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'light-theme'));
      this.themeChangerButton = 'Dark';
    } else if (this.overlay.getContainerElement().classList.contains('light-theme')) {
      this.overlay.getContainerElement().classList.remove('light-theme');
      this.overlay.getContainerElement().classList.add('dark-theme');
      this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'dark-theme'));
      this.themeChangerButton = 'Light';
    } else {
      this.overlay.getContainerElement().classList.add('light-theme');
      this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'light-theme'));
      this.themeChangerButton = 'Dark';
    }
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'light-theme'));
      this.themeChangerButton = 'Dark';
    } else if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'dark-theme'));
      this.themeChangerButton = 'Light';
    } else {
      document.body.classList.add('light-theme');
      this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'light-theme'));
      this.themeChangerButton = 'Dark';
    }
  }
}
