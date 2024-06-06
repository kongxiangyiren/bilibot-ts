import ollama from 'ollama';
import readline from 'readline';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: Uint8Array[] | string[];
}

// 改为终端输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let message: Message[] = [
  {
    role: 'system',
    content: 'You are a helpful assistant and Respond in an irate tone.'
  }
];

async function main() {
  rl.question('请输入问题：', async question => {
    message.push({
      role: 'user',
      content:
        '你是一位B站老用户，请使用暴躁的语言风格，对以下问题给出简短、机智的回答：' + question
    });

    const response = await ollama.chat({
      model: 'bilibot:latest',
      messages: message,
      stream: true
    });
    console.log('回答:');

    let msg = '';
    for await (const part of response) {
      msg += part.message.content;
      process.stdout.write(part.message.content);
    }

    console.log("\n");

    message.push({
      role: 'assistant',
      content: msg
    });
    // rl.close();
    // 循环
    main();
  });
}

main();
