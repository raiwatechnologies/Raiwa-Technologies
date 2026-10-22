import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    company: '',
    marketing_challenges: '',
    preferred_contact: '',
    message: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const challengeOptions = [
    'Ecommerce (Amazon, eBay, Walmart, etc.)',
    'Shopify / TikTok Shop',
    'App, Game or Web Development',
    'Digital & Social Media Marketing',
    'Meta Ads / Google Ads',
    'SEO Optimization',
    'Web or Account Management',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    let firstErrorMessage = null;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      if (!firstErrorMessage) firstErrorMessage = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      if (!firstErrorMessage) firstErrorMessage = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Email is invalid';
      if (!firstErrorMessage) firstErrorMessage = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      if (!firstErrorMessage) firstErrorMessage = 'Phone number is required';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
      if (!firstErrorMessage) firstErrorMessage = 'Please enter a valid phone number';
    }
    
    if (!formData.marketing_challenges) {
      newErrors.marketing_challenges = 'Please select a service';
      if (!firstErrorMessage) firstErrorMessage = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      if (!firstErrorMessage) firstErrorMessage = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message is too short. Please provide more details.';
      if (!firstErrorMessage) firstErrorMessage = 'Message is too short. Please provide more details.';
    }
    
    setErrors(newErrors);
    
    if (firstErrorMessage) {
      toast.error(firstErrorMessage);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // $autoCancel: false is required so React re-renders don't cancel the request
      await pb.collection('contacts').create({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        marketing_challenges: formData.marketing_challenges,
        preferred_contact: formData.preferred_contact || 'Email',
        message: formData.message.trim()
      }, { $autoCancel: false });
      
      setIsSuccess(true);
      toast.success('Message sent successfully! We will be in touch shortly.');
      setFormData(initialFormState);
      setErrors({});
      
      // Reset success state after 5 seconds to allow another submission if needed
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (err) {
      console.error('Error submitting contact form:', err);
      
      let errorMessage = 'Failed to send message. Please try again later.';
      if (err.response?.data) {
        // Extract specific PocketBase validation errors if available
        const pbErrors = err.response.data;
        const firstErrorKey = Object.keys(pbErrors)[0];
        if (firstErrorKey && pbErrors[firstErrorKey]?.message) {
          errorMessage = `${firstErrorKey}: ${pbErrors[firstErrorKey].message}`;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2 font-heading">Request Received</h3>
        <p className="text-muted-foreground max-w-md mb-8">
          Thank you for reaching out. Our team will review your information and get back to you shortly to discuss your project.
        </p>
        <Button 
          onClick={() => setIsSuccess(false)} 
          variant="outline"
          className="font-semibold"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">Full Name <span className="text-destructive">*</span></Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`bg-background text-foreground placeholder:text-muted-foreground h-12 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            placeholder="Your full name"
            disabled={loading}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-sm text-destructive font-medium mt-1">{errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">Email Address <span className="text-destructive">*</span></Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`bg-background text-foreground placeholder:text-muted-foreground h-12 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            placeholder="you@example.com"
            disabled={loading}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-sm text-destructive font-medium mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-medium">Phone Number <span className="text-destructive">*</span></Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`bg-background text-foreground placeholder:text-muted-foreground h-12 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            placeholder="+92 300 1234567"
            disabled={loading}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-sm text-destructive font-medium mt-1">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-foreground font-medium">Company Name</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="bg-background text-foreground placeholder:text-muted-foreground h-12"
            placeholder="Your company (optional)"
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="marketing_challenges" className="text-foreground font-medium">Service Interested In <span className="text-destructive">*</span></Label>
          <Select
            value={formData.marketing_challenges}
            onValueChange={(value) => handleChange('marketing_challenges', value)}
            disabled={loading}
          >
            <SelectTrigger 
              id="marketing_challenges"
              className={`bg-background text-foreground h-12 ${errors.marketing_challenges ? 'border-destructive focus:ring-destructive' : ''}`}
              aria-invalid={!!errors.marketing_challenges}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {challengeOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.marketing_challenges && <p className="text-sm text-destructive font-medium mt-1">{errors.marketing_challenges}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferred_contact" className="text-foreground font-medium">Preferred Contact Method</Label>
          <Select
            value={formData.preferred_contact}
            onValueChange={(value) => handleChange('preferred_contact', value)}
            disabled={loading}
          >
            <SelectTrigger id="preferred_contact" className="bg-background text-foreground h-12">
              <SelectValue placeholder="How should we reach you?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Phone">Phone</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground font-medium">How can we help? <span className="text-destructive">*</span></Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={`min-h-[140px] bg-background text-foreground placeholder:text-muted-foreground resize-y ${errors.message ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          placeholder="Tell us about your business, your goals and how we can help..."
          disabled={loading}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-sm text-destructive font-medium mt-1">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-bold transition-all active:scale-[0.98] shadow-md"
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
            Submitting Request...
          </>
        ) : 'Request Free Consultation'}
      </Button>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        Your information is secure. We never share your data with third parties.
      </p>
    </form>
  );
};

export default ContactForm;