import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class transcribeBrokerService {
    private apiUrl = '/api/v1'; 
  
    constructor(private http: HttpClient) { }
  
    transcribeAudio(audioData: any): Observable<any> {
      // Make HTTP request to OpenAI endpoint to transcribe audio
      // Ensure you handle authentication and formatting of audio data properly
      // Example:
      return this.http.post<any>(`${this.apiUrl}/speech/transcription`, { audio: audioData });
    }
  }
  