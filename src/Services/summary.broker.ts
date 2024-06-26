import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import OpenAI from "openai";
import { Uploadable } from "openai/core";
import { HfInference } from '@huggingface/inference'
@Injectable({
    providedIn: 'root'
})
export class SummaryBrokerService {

    private openai: OpenAI;
    private hf:HfInference;

    constructor() {
        this.openai = new OpenAI({ apiKey: "sk-proj-lYojP9AtN3FvU2SEOgbPT3BlbkFJZlj0cdSyUJVi7OiexuEI",dangerouslyAllowBrowser: true });
        this.hf = new HfInference('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')
    }

    // Method to generate summary
    async generateSummary(text: string) {
        const chatCompletion = await this.openai.chat.completions.create({
            messages: [{ role: 'user', content: "Summarize: " + text, }],
            model: 'gpt-3.5-turbo',
          });

          return chatCompletion;
    }

    async generateTranscription() {
        const audioFile = await this.loadAudioFile("assets/SingleSpeakerSample.mp3");
        const chatCompletion = await this.openai.audio.transcriptions.create({
            model: "whisper-1",
            file: audioFile
        });
        return chatCompletion;
    }
    
    private async loadAudioFile(filePath: string): Promise<File> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", filePath,true);
            xhr.responseType = "blob";
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const blob = xhr.response;
                    const file = new File([blob], "audio.mp3", { type: "audio/mp3" });
                    resolve(file);
                } else {
                    reject("Failed to load audio file");
                }
            };
            xhr.onerror = () => {
                reject("Failed to load audio file");
            };
            xhr.send();
        });
    }

    async getSummeryUsingHuggingFace(text:string){
        
       var result= await this.hf.summarization({
            model: 'facebook/bart-large-cnn',
            inputs:text,
            parameters: {
              max_length: 100
            }
          })

          return result
    } 
    
    async getTranscriptionHuggingFace(){
        const audioFile = await this.loadAudioFile("assets/downloadMulti.wav");
        var result = await this.hf.automaticSpeechRecognition({
            model: 'openai/whisper-large-v3',
            data: audioFile
          })
        // const chatCompletion = await this.openai.audio.transcriptions.create({
        //     model: "whisper-1",
        //     file: audioFile
        // });
        return result;
    }

    async getTranscriptionMultiPersonHuggingFace(){
        const audioFile = await this.loadAudioFile("assets/downloadMulti.wav");
        var result = await this.hf.automaticSpeechRecognition({
            model: 'pyannote/speaker-diarization@2.1',
            data: audioFile
          })
        // const chatCompletion = await this.openai.audio.transcriptions.create({
        //     model: "whisper-1",
        //     file: audioFile
        // });
        return result;
    }
}

