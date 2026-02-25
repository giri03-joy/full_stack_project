import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardBody } from '../components/ui/Card';
import './InfoPages.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder submission
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="info-page bg-main">
            <div className="info-hero bg-primary text-white">
                <div className="container info-hero-content animate-fade-in">
                    <h1 className="info-title">Contact Us</h1>
                    <p className="info-subtitle">Have questions? We're here to help you on your learning journey.</p>
                </div>
            </div>

            <div className="container mt-neg-50 pb-5">
                <div className="contact-grid">
                    <div className="contact-info">
                        <Card className="contact-card">
                            <CardBody className="contact-card-body">
                                <h3>Get in Touch</h3>
                                <p className="text-muted mt-4 mb-4">
                                    Whether you have a question about our courses, need technical support, or want to partner with us, our team is ready to answer all your questions.
                                </p>

                                <ul className="contact-methods">
                                    <li className="contact-method">
                                        <div className="contact-icon bg-primary-light text-primary"><Mail size={20} /></div>
                                        <div>
                                            <strong>Email Us</strong>
                                            <p>support@edulibrary.edu</p>
                                        </div>
                                    </li>
                                    <li className="contact-method">
                                        <div className="contact-icon bg-secondary-light text-secondary"><Phone size={20} /></div>
                                        <div>
                                            <strong>Call Us</strong>
                                            <p>+1 (555) 123-4567</p>
                                        </div>
                                    </li>
                                    <li className="contact-method">
                                        <div className="contact-icon bg-warning-light text-warning"><MapPin size={20} /></div>
                                        <div>
                                            <strong>Visit Us</strong>
                                            <p>123 Education Ave, Tech Park<br />Innovation City, CA 90210</p>
                                        </div>
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="contact-form-wrapper">
                        <Card>
                            <CardBody>
                                <h3 className="mb-4">Send a Message</h3>
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <Input
                                            label="Your Name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Input
                                        label="Subject"
                                        placeholder="How can we help?"
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                    />
                                    <div className="input-wrapper input-full">
                                        <label className="input-label">Message</label>
                                        <textarea
                                            className="contact-textarea"
                                            rows="5"
                                            placeholder="Write your message here..."
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>
                                    <Button type="submit" variant="primary" icon={Send} className="mt-2">
                                        Send Message
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
