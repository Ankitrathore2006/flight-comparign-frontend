import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import '../styles/contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="contact-page">
      <section className="section__container contact__container">
        <div className="contact__header">
          <h2 className="section__header">Get In Touch</h2>
          <p>Have questions or need assistance? We're here to help!</p>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="info__card">
              <div className="info__icon">
                <Mail size={24} />
              </div>
              <h3>Email</h3>
              <p>support@flighthunt.com</p>
              <a href="mailto:support@flighthunt.com" className="info__link">Send us an email</a>
            </div>
            <div className="info__card">
              <div className="info__icon">
                <Phone size={24} />
              </div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <a href="tel:+15551234567" className="info__link">Call us now</a>
            </div>
            <div className="info__card">
              <div className="info__icon">
                <MapPin size={24} />
              </div>
              <h3>Address</h3>
              <p>123 Aviation Street, Suite 100<br />New York, NY 10001</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="info__link">View on map</a>
            </div>
          </div>

          <div className="contact__form-container">
            <div className="form__header">
              <h3>Send us a Message</h3>
              <p>We typically respond within 24 hours</p>
            </div>
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form__group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="form__group">
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="contact__additional">
          <div className="additional__card">
            <Clock size={24} />
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="additional__card">
            <MessageSquare size={24} />
            <h3>Live Chat</h3>
            <p>Available 24/7 for instant support</p>
            <button className="btn btn--outline" style={{width: '12rem'}}>Start Chat</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 