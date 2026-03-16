import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const requiredEnvVars = [
    'ZOHO_SMTP_HOST',
    'ZOHO_SMTP_PORT',
    'ZOHO_SMTP_USER',
    'ZOHO_SMTP_PASS',
    'CONTACT_TO_EMAIL',
] as const;

type ContactPayload = {
    name?: unknown;
    email?: unknown;
    category?: unknown;
    message?: unknown;
};

function getMissingEnvVars() {
    return requiredEnvVars.filter((key) => !process.env[key]);
}

function toSafeString(value: unknown) {
    return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

export async function POST(request: Request) {
    const missingEnvVars = getMissingEnvVars();
    if (missingEnvVars.length > 0) {
        console.error('Missing contact form env vars:', missingEnvVars);
        return NextResponse.json({ error: 'mail_config_missing' }, { status: 500 });
    }

    let payload: ContactPayload;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    }

    const name = toSafeString(payload.name);
    const email = toSafeString(payload.email);
    const category = toSafeString(payload.category);
    const message = toSafeString(payload.message);

    if (!name || !email || !category || !message) {
        return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    }

    if (message.length > 1000) {
        return NextResponse.json({ error: 'message_too_long' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.ZOHO_SMTP_HOST,
        port: Number(process.env.ZOHO_SMTP_PORT),
        secure: Number(process.env.ZOHO_SMTP_PORT) === 465,
        auth: {
            user: process.env.ZOHO_SMTP_USER,
            pass: process.env.ZOHO_SMTP_PASS,
        },
    });

    const escapedMessage = escapeHtml(message).replaceAll('\n', '<br />');

    try {
        await transporter.sendMail({
            from: `"にほんごドクター.com" <${process.env.ZOHO_SMTP_USER}>`,
            to: process.env.CONTACT_TO_EMAIL,
            replyTo: email,
            subject: `【にほんごドクター.com】お問い合わせ: ${category}`,
            text: [
                'にほんごドクター.com からお問い合わせが届きました。',
                '',
                `お名前: ${name}`,
                `メールアドレス: ${email}`,
                `種別: ${category}`,
                '',
                '本文:',
                message,
            ].join('\n'),
            html: `
                <p>にほんごドクター.com からお問い合わせが届きました。</p>
                <p><strong>お名前:</strong> ${escapeHtml(name)}</p>
                <p><strong>メールアドレス:</strong> ${escapeHtml(email)}</p>
                <p><strong>種別:</strong> ${escapeHtml(category)}</p>
                <p><strong>本文:</strong></p>
                <p>${escapedMessage}</p>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Failed to send contact email:', error);
        return NextResponse.json({ error: 'mail_send_failed' }, { status: 500 });
    }
}
