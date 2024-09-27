import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
  imports: [CommonModule]
})
export class ScrollToTopComponent implements OnInit {
  windowScrolled: boolean = false;
  scrollToTopMode: boolean = false; 
  contentOverflow: boolean = false;
  errorMessage: string | null = null; 

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    try {
      this.checkContentOverflow();
    } catch (error) {
      this.handleError('Error during initialization in ngOnInit', error);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    try {
      this.windowScrolled = window.pageYOffset > 100;
    } catch (error) {
      this.handleError('Error during scroll event handling in onWindowScroll', error);
    }
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    try {
      this.checkContentOverflow();
    } catch (error) {
      this.handleError('Error during resize event handling in onWindowResize', error);
    }
  }

  checkContentOverflow(): void {
    try {
      const scrollHeight = this.document.documentElement.scrollHeight;
      const clientHeight = this.document.documentElement.clientHeight;
      this.contentOverflow = scrollHeight > clientHeight;
    } catch (error) {
      this.handleError('Error checking content overflow in checkContentOverflow', error);
    }
  }

  handleButtonClick(): void {
    try {
      if (this.scrollToTopMode) {
        this.scrollToTop();
      } else {
        this.scrollToBottom();
      }
      this.scrollToTopMode = !this.scrollToTopMode;
    } catch (error) {
      this.handleError('Error during button click handling in handleButtonClick', error);
    }
  }

  scrollToTop(): void {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      this.handleError('Error during scrolling to top in scrollToTop', error);
    }
  }

  scrollToBottom(): void {
    try {
      const scrollHeight = this.document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = scrollHeight - viewportHeight;

      if (scrollPosition > window.scrollY) {
        window.requestAnimationFrame(() => {
          try {
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
          } catch (error) {
            this.handleError('Error during scrolling to bottom inside requestAnimationFrame in scrollToBottom', error);
          }
        });
      } else {
        console.log('Already at the bottom or below visible viewport.');
      }
    } catch (error) {
      this.handleError('Error during scrolling to bottom in scrollToBottom', error);
    }
  }

  private handleError(context: string, error: any): void {
    console.error(`${context}:`, error);
    this.errorMessage = `${context}: ${error.message || 'Unknown error'}`;
  }
}
