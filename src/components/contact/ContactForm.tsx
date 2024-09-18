import React, { useEffect, useState, useContext } from 'react';
import { MessageContext } from '../../context/messages/MessagesContext';

const FormSubmitted = () => {
  return (
    <div id="form-submitted">
      <h2>Thanks for reaching out!</h2>
      <p>I'll get back to you shortly.</p>
    </div>
  )
}

const Loading = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

const ContactForm = () => {
  const {
    profile,
    handleMessageSubmit,
    handleRegister,
    awaitingResponse
  } = useContext(MessageContext);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    email:  profile ? profile.email : '',
    message: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (profile.email) {
      setAnswers((a) => ({ ...a, email: profile.email, }));
      setStep(2);
    }
  }, [profile]);

  const validateMessage = (input: string) => {
    const trimmedMessage = input.trim();

    if (trimmedMessage === '') {
      setError('message must not be empty');
      return false;
    }
    if (trimmedMessage.length > 500) {
      setError('Message must be less than 500 characters');
      return false;
    }
    const regex = /^[a-zA-Z0-9\s.,!?'"()-]+$/g;

    if (regex.test(input)) {
      return true;
    } else {
      setError('Invalid Message Text, only ');
      return false; // Input contains invalid characters
    }
  }

  const validateEmail = (input: string) => {
    if (input.trim() === '') {
      setError('A valid email is required');
      return false;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(input)) {
      return true;
    } else {
      setError('Invalid Email address');
      return false;
    }
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      if (validateEmail(inputValue)) {
        handleRegister(inputValue);
        setAnswers({ ...answers, email: inputValue });
        setStep(2);
        setInputValue(answers.message || '');
      }
    } else if (step === 2) {
      if (validateMessage(inputValue)) {
        setAnswers({ ...answers, message: inputValue });
        handleSubmit(e);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setInputValue(answers.email); // Refill the first question when going back
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile.hasSubmitted) {
      const form = e.target as HTMLFormElement;
      const messageInput = form.message as HTMLInputElement;

      try {
        await handleMessageSubmit(messageInput.value);
      } catch(e) {
        setError('Message Error');
      }
    }
  };

  if (profile.hasSubmitted) {
    return <FormSubmitted />
  } else {
    return (
      <form onSubmit={handleNext} className="contact-form">
        <fieldset>
          <legend>Send me a Message</legend>
  
          {/* Display the answer for the first question if available */}
          {step > 1 && (
            <div id="email-answer">
              <h4>Email</h4>
              <p>{answers.email}</p>
            </div>
          )}
  
          {/* Display the current input field based on the step */}
          {step === 1 && (
            <div>
              <label htmlFor="email">First I need your Email:</label>
              <input
                type="email"
                placeholder="alex@email.com"
                id="email"
                name="email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          )}
  
          {step === 2 && (
            <div>
              <label htmlFor="message">How can I help?</label>
              <textarea
                id="message"
                name="message"
                rows={7}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          )}

          {awaitingResponse
            ? <Loading />
            : (
              <div>
                {step > 1 && (
                  <button type="button" onClick={handleBack}>
                    Back
                  </button>
                )}
                <button type="submit">
                  {step === 2 ? 'Submit' : 'Next'}
                </button>
              </div>
            )
          }
        </fieldset>
      </form>
    );
  }
};

export default ContactForm;