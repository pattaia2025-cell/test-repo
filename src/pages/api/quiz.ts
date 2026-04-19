// src/pages/api/quiz.ts

interface QuizData {
  name: string;
  phone: string;
  type: string;
  size: string;
  material: string;
}

export const prerender = false;

export const POST: Astro.APIRoute = async ({ request }) => {
  try {
    const data: QuizData = await request.json();
    const { name, phone, type, size, material } = data;

    const BOT_TOKEN = '8605819491:AAGo38dYfm_EVkkmKGG3YKP65WJ19g1RLy8';
    const CHAT_ID = '8680211979'; // Your Chat ID
    const text = `
🚀 **Новая заявка с сайта!**

👤 **Имя:** ${name}
📞 **Телефон:** ${phone}
🛋️ **Тип мебели:** ${type}
📐 **Размер:** ${size}
🪵 **Материал:** ${material}
    `.trim();

    const telegramUrl = `https://api.telegram.py/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
  } catch (error: any) {
    console.error('Quiz API Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
