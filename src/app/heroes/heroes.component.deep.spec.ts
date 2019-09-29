import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HeroComponent } from '../hero/hero.component';
import { By } from '@angular/platform-browser';

@Directive({
    selector : '[routerLink]',
    host : {'(click)': 'onClick()'}
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    navigateTo : any = null;
    onClick() {
        this.navigateTo = this.linkParams;
    }
}


describe('this is a deep integration test', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let Heroes;
    const heroMockService = jasmine.createSpyObj('HeroService',
     ['getHeroes', 'addHero', 'deleteHeroes']);
    beforeEach(() => {
        Heroes = [{id: 1, name: 'Spider Dude', strength: 8},
                {id: 2, name: 'Iron Man', strength: 8},
                {id: 3, name: 'Fake Man', strength: 1}];
        TestBed.configureTestingModule( {
            declarations: [HeroesComponent, HeroComponent, RouterLinkStubDirective],
            providers: [ {provide: HeroService , useValue : heroMockService }],
            //schemas: [NO_ERRORS_SCHEMA]
        });
       fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should be true if true', () => {
        heroMockService.getHeroes.and.returnValue(of(Heroes));
        fixture.detectChanges();
        const componentDe = fixture.debugElement.queryAll(By.directive(HeroComponent));
        for (let i = 0; i < componentDe.length; i++) {
            expect(componentDe[i].componentInstance.hero).toBe(Heroes[i]);
        }
    });

    it(`Should call heroservice.delete method when  the hero
    component button clicked hero button`, () => {
        heroMockService.getHeroes.and.returnValue(of(Heroes));
        spyOn(fixture.componentInstance, 'delete');
        fixture.detectChanges();
        const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent))[0];
        // heroComponent.query(By.css('button'))
        //     .triggerEventHandler('click', {stopPropagation: () => {}});
        //(<HeroComponent>heroComponent.componentInstance).delete.emit(undefined);
        heroComponent.triggerEventHandler('delete', null);
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(Heroes[0]);
    });

    it('Should add new heros after clicking add button', () => {
        heroMockService.getHeroes.and.returnValue(of(Heroes));
        fixture.detectChanges();
        const heroName = 'Mr new';
        const inputelement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputelement.value = heroName;
        heroMockService.addHero.and.returnValue(of({id: 5, name: heroName, strength: 100 }));
        fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(heroName);
    });

    it('Should have correct route ', () => {
    heroMockService.getHeroes.and.returnValue(of(Heroes));
    fixture.detectChanges();
      const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
      let routerLink = heroComponents[0].query(By.directive(RouterLinkStubDirective))
                        .injector.get(RouterLinkStubDirective);
      heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

      expect(routerLink.navigateTo).toBe('/detail/1');
    });

});
