// EmailJS Configuration
// You need to set up EmailJS account and get these values from https://www.emailjs.com/

export const EMAILJS_CONFIG = {
  // Your EmailJS service ID (create a service in EmailJS dashboard)
  SERVICE_ID: 'service_pt0sf7b',
  
  // Your EmailJS template ID (create a template in EmailJS dashboard)
  TEMPLATE_ID: 'template_tjt6xde',
  
  // Your EmailJS public key (found in EmailJS account settings)
  PUBLIC_KEY: 'WJRmUXBmOwWweMeGE',
  
  // Your email address where contact form messages will be sent
  TO_EMAIL: 'jenishkp07@gmail.com'
};

// EmailJS template variables that will be used in your template
export const TEMPLATE_VARIABLES = {
  from_name: '{{from_name}}',
  from_email: '{{from_email}}',
  subject: '{{subject}}',
  message: '{{message}}',
  to_email: '{{to_email}}',
  reply_to: '{{reply_to}}'
};
