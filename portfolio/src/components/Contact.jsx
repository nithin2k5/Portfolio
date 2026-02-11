import React, { useState } from 'react';
import { FaEnvelope, FaMobileAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', isError: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({ text: 'Message sent successfully!', isError: false });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 px-4 bg-background relative transition-colors duration-500">
      {/* Vertical Section Name */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 border-r border-primary/5 flex items-center justify-center hidden md:flex select-none">
        <span className="text-[10px] font-black text-primary/20 tracking-[0.5em] uppercase whitespace-nowrap -rotate-90">
          TOUCH
        </span>
      </div>

      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-xs font-black text-primary/40 tracking-[0.3em] uppercase">The Connection</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-foreground tracking-tighter"
          >
            LET'S CONNECT.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-foreground tracking-tight">CONTACT INFO</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-primary/40 uppercase mb-1">Email</p>
                    <a href="mailto:ntbm8125@gmail.com" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                      ntbm8125@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                    <FaMobileAlt />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-primary/40 uppercase mb-1">Phone</p>
                    <a href="tel:+919398225082" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                      +91 9398225082
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-primary/40 uppercase mb-1">Location</p>
                    <p className="text-lg font-bold text-foreground uppercase">
                      Andhra Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/10">
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                "Code is like humor. When you have to explain it, it's bad."
              </p>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 bg-primary/[0.01] border-2 border-primary/5 p-8 md:p-12 relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-black tracking-widest uppercase text-primary/40">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="WALTER WHITE"
                    className="rounded-none border-primary/10 bg-background focus-visible:ring-primary h-12 text-xs font-bold uppercase tracking-widest"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black tracking-widest uppercase text-primary/40">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="WALTER@HEISENBERG.COM"
                    className="rounded-none border-primary/10 bg-background focus-visible:ring-primary h-12 text-xs font-bold uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-[10px] font-black tracking-widest uppercase text-primary/40">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="NEW EMPIRE INQUIRY"
                  className="rounded-none border-primary/10 bg-background focus-visible:ring-primary h-12 text-xs font-bold uppercase tracking-widest"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-[10px] font-black tracking-widest uppercase text-primary/40">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="SAY MY NAME..."
                  className="rounded-none border-primary/10 bg-background focus-visible:ring-primary text-xs font-bold uppercase tracking-widest"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-none bg-foreground text-background hover:bg-foreground/90 font-black tracking-widest uppercase"
              >
                {isSubmitting ? 'SENDING...' : (
                  <>
                    SEND MESSAGE <FaPaperPlane className="ml-2 w-3 h-3" />
                  </>
                )}
              </Button>

              {submitMessage.text && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center text-[10px] font-black tracking-widest uppercase ${submitMessage.isError ? 'text-red-500' : 'text-green-500'}`}
                >
                  {submitMessage.text}
                </motion.p>
              )}
            </form>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 border border-primary/5 rounded-full pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;