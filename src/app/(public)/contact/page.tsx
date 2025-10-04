"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaLocationDot } from "react-icons/fa6";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import Head from "next/head";

// You'll need to place your animation JSON file in the public folder
// or import it if it's in your assets folder

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.target as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );

      toast.success("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.error("Failed to send the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 mt-10 bg-gray-50">
      <Head>
        <title>Contact | My Portfolio</title>
      </Head>
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Contact Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Get in touch with me for collaborations, projects, or just to say
            hello!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 justify-between items-start max-w-6xl mx-auto">
          {/* Contact Form Section */}
          <div className="flex-1 w-full">
            <form
              className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-100"
              onSubmit={handleSubmit}
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                Get in Touch
              </h3>

              <div className="space-y-4">
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    required
                    disabled={isLoading}
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    required
                    disabled={isLoading}
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                    required
                    disabled={isLoading}
                  ></textarea>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-secondary to-primary text-white font-semibold py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="flex-1 w-full">
            <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-100 h-full">
              {/* Animation - You can add your Lottie animation here */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                  <div className="text-6xl text-primary">💬</div>
                </div>
                {/* If you have Lottie animation, uncomment this:
                <Lottie
                  className="h-56 w-full"
                  animationData={contactAnimation}
                  loop={true}
                />
                */}
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 text-center">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaLocationDot className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <p className="text-gray-600">Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaEnvelope className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">sadiaafrin2792@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FaPhone className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p className="text-gray-600">+8801707604378</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaWhatsapp className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">WhatsApp</p>
                    <p className="text-gray-600">+8801707604378</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-secondary to-primary h-1 w-20 rounded-lg mx-auto mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
