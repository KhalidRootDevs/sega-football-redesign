"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Send, MessageCircle, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What sports and leagues do you cover?",
      answer: "We cover all major sports including football, basketball, tennis, cricket, and more. You can access leagues worldwide including Premier League, La Liga, NBA, NFL, and many others. Check our pricing page for specific league packages."
    },
    {
      question: "How do subscriptions work?",
      answer: "We offer both universal all-access subscriptions and individual league subscriptions. You can choose monthly, quarterly, or yearly plans with discounts for longer commitments. All subscriptions auto-renew but can be cancelled anytime."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards (Visa, Mastercard, Maestro) through Stripe, and cryptocurrency payments (Bitcoin, Ethereum, BNB, USDT) for added flexibility and privacy."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, absolutely! You can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll retain access until the end of your current billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 7-day money-back guarantee for all new subscriptions. If you're not satisfied within the first week, contact our support team for a full refund. Refunds after this period are handled on a case-by-case basis."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 3-day free trial for new users on select subscription plans. No credit card required for the trial period. You can explore all features before committing to a paid plan."
    },
    {
      question: "Can I watch matches on multiple devices?",
      answer: "Yes, depending on your subscription plan. Basic plans allow streaming on 1 device, while premium plans support up to 5 simultaneous streams. You can access your account on any device with internet connection."
    },
    {
      question: "What if a match is postponed or cancelled?",
      answer: "If a match is postponed, we'll update the schedule automatically. For cancelled matches, no credits are issued as your subscription provides access to all available content during the period, not individual matches."
    },
    {
      question: "Do you provide match highlights and replays?",
      answer: "Yes! All matches include full replays available for 30 days after the event, plus 5-10 minute highlight packages. Premium subscribers get extended replay access and additional bonus content."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us via email at support@betlive.com, through our contact form above, or join our Telegram channel for instant updates. Our support team typically responds within 24 hours during business days."
    }
  ];

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    
    reset();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#00303D] to-[#005266] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-balance">
            Get in Touch
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl text-pretty">
            Have a question or need support? We're here to help you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00303D] focus:border-transparent transition-all"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00303D] focus:border-transparent transition-all"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help you?"
                    {...register("subject")}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00303D] focus:border-transparent transition-all"
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    {...register("message")}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00303D] focus:border-transparent transition-all resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00303D] hover:bg-[#004455] text-white py-6 rounded-xl font-semibold text-base shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Support Email */}
            <div className="bg-gradient-to-br from-[#00303D] to-[#005266] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Email Support</h3>
              </div>
              <p className="text-gray-200 text-sm mb-3">
                Get in touch via email for detailed inquiries
              </p>
              <a
                href="mailto:support@betlive.com"
                className="text-white font-semibold hover:underline break-all"
              >
                support@betlive.com
              </a>
            </div>

            {/* Telegram Channel */}
            <div className="bg-gradient-to-br from-[#00303D] to-[#005266] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Telegram</h3>
              </div>
              <p className="text-gray-200 text-sm mb-3">
                Join our Telegram channel for instant updates
              </p>
              <a
                href="https://t.me/betlive_support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl transition-all"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 3.782-1.36 5.014-.168.52-.5.693-.82.71-.696.024-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.783-.417-1.213.258-1.916.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.122.1.155.234.171.329-.001.095.013.315.001.486z" />
                </svg>
                Join Channel
              </a>
            </div>

            {/* Office Hours */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Office Hours
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold text-gray-900">9AM - 6PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold text-gray-900">10AM - 4PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold text-gray-900">Closed</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Response time: Usually within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto text-pretty">
              Find quick answers to common questions about our service
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4 text-balance">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFaqIndex === index ? (
                      <Minus className="w-5 h-5 text-[#00303D]" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {openFaqIndex === index && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed text-pretty">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-12 text-center bg-gradient-to-br from-[#00303D] to-[#005266] rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-200 mb-6 max-w-xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <a
              href="mailto:support@betlive.com"
              className="inline-flex items-center gap-2 bg-white text-[#00303D] hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl transition-all shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
