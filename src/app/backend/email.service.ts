// src/app/email.service.ts
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private userID = 'NKJB3rD3USsOsoZhc'; 
  private serviceID = 'service_a1laozn'; 
  private templateID = 'template_930pyh4'; 

  constructor() { }

  sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, formData, this.userID);
  }
}
