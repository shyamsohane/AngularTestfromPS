import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('Hero Detail compoennt test', () => {
    const heroServiceMock = jasmine.createSpyObj('HeroService', ['getHero']);
    const locationMock = jasmine.createSpyObj('Location', ['back']);
    let fixture: ComponentFixture<HeroDetailComponent>;
    const Route = {
        snapshot: {paramMap :
            { get : () => '3'}}
    };
    beforeEach(() => {
      TestBed.configureTestingModule(
      {
          providers: [{provide: HeroService, useValue: heroServiceMock},
                      { provide: ActivatedRoute, useValue : Route},
                     { provide: Location, useValue : locationMock}],
          declarations : [HeroDetailComponent],
          imports: [FormsModule]
      });

    });

    it('Initial test for component', () => {
        heroServiceMock.getHero.and.returnValue(of({id: 5, name: 'Dude Hero', strength: 100}));
        fixture = TestBed.createComponent(HeroDetailComponent);
        fixture.detectChanges();
        const h2de = fixture.debugElement.query(By.css('h2')).nativeElement;
        console.log(h2de);
        expect(h2de.textContent).toContain('DUDE HERO');
    });

});
