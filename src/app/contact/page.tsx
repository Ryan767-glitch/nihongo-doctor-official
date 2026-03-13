'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [messageLength, setMessageLength] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const form = e.currentTarget;
        const formData = new FormData(form);

        if (formData.get('bot-field')) {
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('https://formsubmit.co/ajax/urutorayoyo@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    お名前: formData.get('name'),
                    メールアドレス: formData.get('_replyto'),
                    カテゴリ: formData.get('category'),
                    メッセージ: formData.get('message'),
                    _subject: `にほんごドクター.com お問い合わせ: ${formData.get('category')}`,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setMessageLength(0);
                form.reset();
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                    お問い合わせ / Contact Us
                </h1>

                <p className="text-gray-600 mb-8">
                    掲載情報の修正依頼、新規掲載のご希望、医療機関からのお問い合わせ、その他ご質問をお寄せください。
                </p>

                {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-8">
                        <p className="font-medium">お問い合わせを受け付けました。内容を確認のうえ、順次ご連絡いたします。</p>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-8">
                        <p className="font-medium">送信に失敗しました。時間をおいて再度お試しください。</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="sr-only" aria-hidden="true">
                        <label htmlFor="bot-field">Leave this field empty</label>
                        <input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            お名前 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="山田 太郎"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            メールアドレス <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="_replyto"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            カテゴリ <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                        >
                            <option value="">選択してください</option>
                            <option value="掲載情報の修正依頼">掲載情報の修正依頼</option>
                            <option value="新規掲載の依頼">新規掲載の依頼</option>
                            <option value="医療機関からのお問い合わせ">医療機関からのお問い合わせ</option>
                            <option value="バグ・不具合の報告">バグ・不具合の報告</option>
                            <option value="その他">その他</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            メッセージ <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            maxLength={1000}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
                            placeholder="お問い合わせ内容をご記入ください（最大1000文字）"
                            onChange={(e) => setMessageLength(e.target.value.length)}
                        />
                        <div className="text-right text-xs text-gray-500 mt-1">
                            <span>{messageLength}</span> / 1000文字
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600 mb-6">
                        個人情報の取り扱いについては
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                            プライバシーポリシー
                        </Link>
                        をご確認ください。
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full sm:w-auto px-8 py-3 rounded-md font-medium text-white transition-all duration-200 flex justify-center items-center gap-2 ${
                            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647Z" />
                                </svg>
                                送信中...
                            </>
                        ) : (
                            '送信する / Submit'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
