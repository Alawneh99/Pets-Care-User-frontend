import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RssFeedService {
  private rssToJsonServiceUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';

  constructor(private http: HttpClient) { }

  getFeedContent(feedUrl: string): Observable<any> {
    return this.http.get<any>(`${this.rssToJsonServiceUrl}${encodeURIComponent(feedUrl)}`);
  }
}
