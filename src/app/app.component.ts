import { Component } from '@angular/core';
import { SummaryBrokerService } from 'src/Services/summary.broker';
import { transcribeBrokerService } from 'src/Services/transcribe.broker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Transcription';
  audioData: any; // Store recorded audio data
  transcription: string;
  summeryRequestText: string = "Artificial Intelligence (AI) has revolutionized various sectors such as healthcare, finance, transportation, and entertainment with its ability to automate tasks and analyze large amounts of data. However, this technological advancement is not without its drawbacks.One of the most significant concerns about AI is job displacement. As AI systems become more efficient and accurate, they are increasingly being used to perform tasks traditionally done by humans. This automation could lead to widespread unemployment and social instability, as workers are replaced by machines. In addition to job displacement, AI also raises significant privacy concerns. AI systems often require large amounts of data to function effectively, leading to potential invasions of privacy. For example, AI algorithms used in social media platforms can analyze user behavior and preferences, potentially leading to an invasion of privacy. Another issue with AI is the lack of transparency in how these systems operate. This “black box” problem can lead to mistrust and fear among those who use or are affected by AI systems. It’s challenging to decipher how these systems make decisions, which is particularly concerning when AI is used in critical areas like healthcare or criminal justice. Furthermore, as AI becomes more integrated into our daily lives, there’s a risk that we may become overly dependent on this technology. This could lead to a lack of critical thinking skills as we rely on technology to solve problems.";
  constructor(private transcribe: transcribeBrokerService, 
              private summary: SummaryBrokerService) { }

  startRecording() {
    // Use Angular APIs or libraries to start recording audio
    // Example:
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        // Add event listeners to handle audio data
        mediaRecorder.ondataavailable = (e) => {
          this.audioData = e.data;
        };
        mediaRecorder.start();
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  }

  stopRecordingAndTranscribe() {
    // Stop recording audio
    // Example:
     //mediaRecorder.stop();

    // Send recorded audio for transcription
    this.transcribe.transcribeAudio(this.audioData)
      .subscribe(response => {
        this.transcription = response.transcription;
      }, error => {
        console.error('Error transcribing audio:', error);
      });
  }

  getSummary(){
    var summary = this.summary.generateSummary(this.summeryRequestText);
    console.log(summary);
  }

  getTranscription(){
    var transcription = this.summary.generateTranscription();
    console.log(transcription);
  }
}
