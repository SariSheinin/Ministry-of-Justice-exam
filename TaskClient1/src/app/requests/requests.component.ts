import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Request } from '../request/request.module';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: Request[] = [];
  requestForm: FormGroup;
  editingRequestId: number | null = null;
  showForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService
  ) {
    this.requestForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      subject: [''],
      content: ['']
    });
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  // טעינת כל הפניות מה-API
  loadRequests() {
    this.requestService.getAll().subscribe(
      data => this.requests = data,
      err => console.error(err)
    );
  }

  // פתיחה/סגירה של הטופס
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.requestForm.reset();
      this.editingRequestId = null;
    }
  }

  // הוספה או עדכון פנייה
  addRequest() {
    if (this.requestForm.invalid) return;

    const requestData: Request = this.requestForm.value;

    if (this.editingRequestId) {
      // עדכון פנייה קיימת
      requestData.id = this.editingRequestId;
      this.requestService.update(requestData).subscribe(() => {
        this.loadRequests();
        this.requestForm.reset();
        this.editingRequestId = null;
        this.showForm = false;
      }, err => console.error(err));
    } else {
      // הוספת פנייה חדשה
      this.requestService.add(requestData).subscribe(() => {
        this.loadRequests();
        this.requestForm.reset();
        this.showForm = false;
      }, err => console.error(err));
    }
  }

  // עריכת פנייה – טוען את הערכים לטופס ופותח אותו
  editRequest(request: Request) {
    this.editingRequestId = request.id !== undefined ? request.id : null;
    this.showForm = true;
    this.requestForm.patchValue({
      name: request.name,
      subject: request.subject,
      content: request.content
    });
  }

  // מחיקת פנייה
  deleteRequest(id: number) {
    if (!confirm('בטוח שברצונך למחוק את הפנייה?')) return;

    this.requestService.delete(id).subscribe(() => {
      this.loadRequests();
    }, err => console.error(err));
  }
}
