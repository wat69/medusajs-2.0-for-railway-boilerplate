"use client"
import React, { useState } from 'react';
import { MessageSquare, CheckCircle, User, Mail, HelpCircle, X } from 'lucide-react';

const AskQuestionForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        question: '',
        questionType: 'general'
    });
    const [errors, setErrors] = useState({});

    // Sample existing questions for the product
    const existingQuestions = [
        {
            id: 1,
            question: "What's the material composition of this product?",
            answer: "This product is made from 100% organic cotton with reinforced stitching.",
            askedBy: "Sarah M.",
            date: "2 days ago"
        },
        {
            id: 2,
            question: "Is this available in other colors?",
            answer: "Currently available in Black, Navy, and Charcoal. We're planning to add more colors next month.",
            askedBy: "Mike K.",
            date: "1 week ago"
        },
        {
            id: 3,
            question: "How does the sizing run? Should I size up or down?",
            answer: "Our sizing runs true to size. We recommend checking our size guide for the best fit.",
            askedBy: "Jennifer L.",
            date: "2 weeks ago"
        }
    ];

    const questionTypes = [
        { value: 'general', label: 'General Question' },
        { value: 'sizing', label: 'Size & Fit' },
        { value: 'shipping', label: 'Shipping & Returns' },
        { value: 'care', label: 'Care Instructions' },
        { value: 'availability', label: 'Availability' }
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.question.trim()) {
            newErrors.question = 'Question is required';
        } else if (formData.question.trim().length < 10) {
            newErrors.question = 'Question must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after success
        setTimeout(() => {
            setIsSubmitted(false);
            setIsOpen(false);
            setFormData({
                name: '',
                email: '',
                question: '',
                questionType: 'general'
            });
        }, 3000);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            question: '',
            questionType: 'general'
        });
        setErrors({});
        setIsSubmitted(false);
    };

    return (
        <div className="mx-auto p-6 bg-white">
            <h1 className="text-3xl  text-center font-bold text-gray-900 mb-8">Ask a Question</h1>

            <div className="space-y-8">
                {/* Existing Questions Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                        Customer Questions ({existingQuestions.length})
                    </h2>

                    <div className="space-y-4 mb-6">
                        {existingQuestions.map((qa) => (
                            <div key={qa.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="mb-3">
                                    <p className="font-medium text-gray-900 mb-1">Q: {qa.question}</p>
                                    <p className="text-sm text-gray-500">Asked by {qa.askedBy} • {qa.date}</p>
                                </div>
                                <div className="pl-4 border-l-2 border-blue-200">
                                    <p className="text-gray-700"><span className="font-medium text-blue-600">A:</span> {qa.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ask Question Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                    >
                        <HelpCircle className="w-5 h-5" />
                        Ask a Question
                    </button>
                </div>

                {/* Modal Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-blue-600" />
                                    Ask a Question
                                </h3>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        resetForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Success State */}
                            {isSubmitted ? (
                                <div className="p-8 text-center">
                                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Question Submitted!</h3>
                                    <p className="text-gray-600 mb-4">
                                        Thank you for your question. We'll review it and respond within 24 hours.
                                    </p>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <p className="text-sm text-green-800">
                                            <strong>Your Question:</strong> "{formData.question}"
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                /* Form */
                                <div className="p-6 space-y-6">
                                    <p className="text-gray-600 text-sm">
                                        Have a question about this product? Our team and community are here to help!
                                    </p>

                                    {/* Question Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Question Type
                                        </label>
                                        <select
                                            name="questionType"
                                            value={formData.questionType}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        >
                                            {questionTypes.map(type => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        <p className="text-xs text-gray-500 mt-1">We'll notify you when your question is answered</p>
                                    </div>

                                    {/* Question Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Question *
                                        </label>
                                        <textarea
                                            name="question"
                                            value={formData.question}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none ${errors.question ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="What would you like to know about this product?"
                                        />
                                        {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question}</p>}
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.question.length}/500 characters (minimum 10)
                                        </p>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsOpen(false);
                                                resetForm();
                                            }}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit Question'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AskQuestionForm;