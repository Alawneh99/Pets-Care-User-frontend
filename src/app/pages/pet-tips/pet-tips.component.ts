import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RssFeedService } from '../../backend/rss-feed.service';

@Component({
  selector: 'app-pet-tips',
  templateUrl: './pet-tips.component.html',
  styleUrls: ['./pet-tips.component.css']
})
export class PetTipsComponent implements OnInit, OnDestroy {
  tips: any[] = [];
  private subscription!: Subscription;

  constructor(private rssFeedService: RssFeedService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTips();
    // Set up an interval to refresh the tips every 10 seconds (10000 milliseconds)
    this.subscription = interval(300000).pipe(
      switchMap(() => this.rssFeedService.getFeedContent('https://news.google.com/rss/search?hl=en-US&gl=US&q=Pets&um=1&ie=UTF-8&ceid=US:en'))
    ).subscribe(data => {
      console.log('Fetched data:', data.items.slice(0, 5)); // Log fetched data
      this.tips = this.randomizeTips(data.items);
      this.cd.detectChanges(); // Manually trigger change detection
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadTips(): void {
    const feedUrl = 'https://news.google.com/rss/search?hl=en-US&gl=US&q=Pets&um=1&ie=UTF-8&ceid=US:en';
    this.rssFeedService.getFeedContent(feedUrl).subscribe(data => {
      console.log('Initial load:', data.items.slice(0, 5)); // Log initial data
      this.tips = this.randomizeTips(data.items);
      this.cd.detectChanges(); // Manually trigger change detection
    });
  }

  randomizeTips(tips: any[]): any[] {
    return tips.sort(() => Math.random() - 0.5).slice(0, 5); // Randomize the order of tips
  }
}
