import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pet } from '../dtos/pet.dto';
import { Item } from '../dtos/item.dto';
import { LoginRequest, LoginResponse } from '../dtos/login.dto';
import { Signup } from '../dtos/signup.dto';
import { ForgetPasswordRequest, ForgetPasswordResponse } from '../dtos/forgetpasswod.dto';
import { ResetPasswordRequest, ResetPasswordResponse } from '../dtos/resetpassword.dto';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private baseURL: string = 'https://localhost:7156/api/User';
  private imageUploadURL: string = 'https://localhost:7156/api/Files/UploadImageAndGetURL';
  public authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.imageUploadURL, formData, {
        headers: new HttpHeaders({
            'accept': 'text/plain'
        }),
        responseType: 'text' // Tell Angular to treat the response as plain text
    });
}

  GetAllPets(): Observable<Pet[]> {
    const url = `${this.baseURL}/pets`;
    return this.http.get<Pet[]>(url);
  }

  GetAllItems(): Observable<Item[]> {
    const url = `${this.baseURL}/items`;
    return this.http.get<Item[]>(url);
  }

  Login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseURL}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = new LoginRequest(email, password);
    return this.http.post<LoginResponse>(url, body, { headers }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
        this.authStatus.next(true); // Update auth status on login
      })
    );
  }
  
  Signup(formData: FormData): Observable<void> {
    const url = `${this.baseURL}/user`;
    const headers = new HttpHeaders(); 
    return this.http.post<void>(url, formData, { headers });
  }

  ForgetPassword(email: string): Observable<ForgetPasswordResponse> {
    const url = `${this.baseURL}/ForgotPassword`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = new ForgetPasswordRequest(email);
    return this.http.post<ForgetPasswordResponse>(url, body, { headers });
  }

  ResetPassword(email: string, token: string, newPassword: string): Observable<ResetPasswordResponse> {
    const url = `${this.baseURL}/ResetPassword`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = new ResetPasswordRequest(email, token, newPassword);
    return this.http.post<ResetPasswordResponse>(url, body, { headers });
  }

  SignOut(userId: number): Observable<void> {
    const url = `${this.baseURL}/logout/${userId}`;
    return this.http.post<void>(url, {}, {
      headers: new HttpHeaders({ 'accept': '*/*' })
    }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.authStatus.next(false); // Update auth status on logout
      })
    );
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
}
