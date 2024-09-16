import React, { useState } from 'react';

interface ContactFormProps {
  onSubmit: (arg0: string, arg1: string) => void;
  canSubmit: boolean;
  onError: (arg1: { error: string }) => void;
}

export default function ContactForm({ onSubmit, canSubmit, onError }: ContactFormProps) {
  
  const [email, setEmail] = useState('');
  const [message,setMessage] = useState('');

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (canSubmit) {
      onSubmit(email, message);
    } else {
      onError({ error: 'SUBMIT STATUS ::' + canSubmit });
    }
  }

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  }

  const handleMessage: React.ChangeEventHandler<HTMLTextAreaElement> = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value;
    setMessage(message);
  }

  return (
    <div className="form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email-input">Email:</label>
          <input type="email" name="email" id="email-input" onChange={handleEmail} required/>
        </div>
        <div className="input-container">
          <label htmlFor="message">Message:</label>
          <textarea name="message" id="message-input" onChange={handleMessage} rows={4} required/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
