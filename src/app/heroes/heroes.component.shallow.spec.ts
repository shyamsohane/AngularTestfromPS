import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";

describe('this is shallow test', () => {
    let fixture : ComponentFixture<HeroesComponent>;
    let Heroes;
    let heroMockService = jasmine.createSpyObj('HeroService', ['getHeroes','addHeroes','deleteHeroes']);
    beforeEach(() => {
        Heroes = [{id: 1, name: 'Spider Dude', strength: 8},
                {id: 2, name: 'Iron Man', strength: 8},
                {id: 3, name: 'Fake Man', strength: 1}];
        TestBed.configureTestingModule( {
            declarations: [HeroesComponent],
            schemas : [NO_ERRORS_SCHEMA],
            providers: [ {provide: HeroService , useValue : heroMockService }]
        });
       fixture = TestBed.createComponent(HeroesComponent);
    });

    it('Should set heroes correctly from service ', () => {
        heroMockService.getHeroes.and.returnValue(of(Heroes));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

})