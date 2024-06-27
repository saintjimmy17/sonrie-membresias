import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.css']
})
export class ModalPasswordComponent {
  showModal: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.showModal$.subscribe(show => {
      this.showModal = show;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
