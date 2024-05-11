import { ModalService } from './modal.service';

describe('ModalService', () => {

  let service: ModalService;
  let mockModalComponent: any;

  beforeEach(() => {
    mockModalComponent = {
      displayModal: false,
      title: '',
      description: '',
      isCancellable: true, // Agrega propiedades necesarias aquí
      primaryButtonDisabled: false, // Agrega propiedades necesarias aquí
      textBtn: '', // Agrega propiedades necesarias aquí
      textBtnLeft: '', // Agrega propiedades necesarias aquí
      closeModal: jest.fn(),
    };
    service = new ModalService();
    service.setModal(mockModalComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set modal correctly', () => {
    service.setModal(mockModalComponent);
    expect(service.getModal()).toEqual(mockModalComponent);
  });

  it('should show modal correctly', () => {
    const title = 'Test Title';
    const description = 'Test Description';
    service.showModal(title, description);
    expect(mockModalComponent.displayModal).toBe(true);
    expect(mockModalComponent.title).toBe(title);
    expect(mockModalComponent.description).toBe(description);
  });

  it('should return the current modal component when it exists', () => {
    service.setModal(mockModalComponent);
    expect(service.getModal()).toBe(mockModalComponent);
  });

  it('should close modal correctly', () => {
    mockModalComponent.displayModal = true;
    service.setModal(mockModalComponent);
    service.closeModal();
    expect(mockModalComponent.displayModal).toEqual(false);
  });

});
