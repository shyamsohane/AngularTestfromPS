import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('Test for Heroes component', () => {
 let component: HeroesComponent;
 let Heroes;
 let MockHeroService;
 beforeEach(() => {
      Heroes = [{id: 1, name: 'Spider Dude', strength: 8},
                {id: 2, name: 'Iron Man', strength: 8},
                {id: 3, name: 'Fake Man', strength: 1}];

      MockHeroService = jasmine.createSpyObj('HeroService', ['getHero', 'addHero', 'deleteHero']);
      component = new HeroesComponent(MockHeroService);
 });

describe('delete', () => {
    it('Should remove hero from the list', () => {
        MockHeroService.deleteHero.and.returnValue(of(true));
        component.heroes = Heroes;
        component.delete(Heroes[2]);
        expect(component.heroes.length).toBe(2);
    });

    xit('Should have called delete', () => {
        MockHeroService.deleteHero.and.returnValue(of(true));
        component.heroes = Heroes;
        component.delete(Heroes[2]);
        expect(MockHeroService.deleteHero).toHaveBeenCalledWith(Heroes[2]);
    });
});
});
