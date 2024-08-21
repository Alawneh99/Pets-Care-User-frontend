import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { PetTipsComponent } from './pet-tips.component';
import { RssFeedService } from '../../backend/rss-feed.service';

describe('PetTipsComponent', () => {
  let component: PetTipsComponent;
  let fixture: ComponentFixture<PetTipsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetTipsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ RssFeedService, DomSanitizer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetTipsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display pet tips', () => {
    const mockData = {
      status: 'ok',
      feed: { /* feed info */ },
      items: [
        {
          title: 'How to Care for Your Pet',
          link: 'https://www.thesprucepets.com/how-to-care-for-your-pet-123456',
          description: 'Learn the best tips for taking care of your pet...'
        },
        {
          title: 'Best Foods for Pets',
          link: 'https://www.thesprucepets.com/best-foods-for-pets-123457',
          description: 'Discover the best foods to keep your pet healthy...'
        }
      ]
    };

    const feedUrl = 'https://www.thesprucepets.com/rss';
    const req = httpMock.expectOne(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const tipsList = compiled.querySelectorAll('li');
    expect(tipsList.length).toBe(2);
    expect(tipsList[0].textContent).toContain('How to Care for Your Pet');
    expect(tipsList[1].textContent).toContain('Best Foods for Pets');
  });
});
