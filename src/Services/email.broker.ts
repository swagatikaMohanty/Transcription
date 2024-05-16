import { Injectable } from "@angular/core";
import emailjs from '@emailjs/browser';
import { EmailEntryModel } from "src/entities/Email.entry.model";

@Injectable({
    providedIn: 'root'
})

export class EmailBrokerService{


    async sendEmail(model:EmailEntryModel) {
        var result =emailjs.send("service_dbirofn","template_8mfq5c7",{
            from_name: model.from_name,
            to_name: model.to_name,
            message: model.message,
            reply_to: model.reply_to
            },
            {
                publicKey: 'jZmrcp2VxxjJZDweN'
            });

            return result;
    }
     
}