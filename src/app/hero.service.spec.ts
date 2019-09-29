import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';


describe('Test Hero service', () => {

    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;
    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add', 'get', 'delete']);
        TestBed.configureTestingModule( {
            imports: [HttpClientTestingModule],
            providers : [HeroService, {provide: MessageService, useValue: mockMessageService} ]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    });

    it('test get oepration' , () => {
        service.getHero(4).subscribe();
        const req = httpTestingController.expectOne('api/heroes/4');
        req.flush({id: 4, name: 'Super Dude', strength: 100});
        httpTestingController.verify();
    });
});
