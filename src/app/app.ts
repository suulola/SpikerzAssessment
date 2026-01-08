import { Component, signal, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('spikerz-assessment');
  private readonly supportedLanguages = ['en', 'fr', 'he'] as const;

  constructor(
    private readonly translate: TranslateService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.translate.addLangs([...this.supportedLanguages]);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    const language = this.supportedLanguages.includes(
      browserLang as (typeof this.supportedLanguages)[number]
    )
      ? (browserLang as (typeof this.supportedLanguages)[number])
      : 'en';

    this.translate.use(language);
    this.updateDocumentDirection(language);
    this.translate.onLangChange.subscribe((event) => this.updateDocumentDirection(event.lang));
  }

  private updateDocumentDirection(lang: string): void {
    this.document.documentElement.lang = lang;
    this.document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }
}
