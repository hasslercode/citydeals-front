import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { AuthUseCase } from '../../../core/auth/domain/usecase/auth.usecase';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let mockRouter: any;
  let authUseCaseMock: any;

  beforeEach(() => {

    mockRouter = {
      navigate: jest.fn().mockResolvedValue(true), // Resuelve la promesa
    };

    authUseCaseMock = {
      logout: jest.fn(),
    };



    component = new HeaderComponent(mockRouter, authUseCaseMock);
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the specified route', () => {
    const route = 'example';
    component.navigateTo(route);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should call logout from authUseCase when logout is called', () => {
    component.logout();
    expect(authUseCaseMock.logout).toHaveBeenCalled();
  });
});
