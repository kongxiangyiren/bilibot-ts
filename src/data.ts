import fs, { appendFileSync } from 'fs';
import readline from 'readline';

// 创建一个可读流
// const instream = fs.createReadStream('data/test.jsonl');
const instream = fs.createReadStream('data/valid.jsonl');

// 将可读流转换为一个行读取器
const rl = readline.createInterface({
  input: instream,
  crlfDelay: Infinity
});

// 处理行事件
const jsonArray: any[] = [];

rl.on('line', line => {
  try {
    const json = JSON.parse(line);
    jsonArray.push(json);
  } catch (e) {
    console.error('Error parsing JSON:', e);
  }
});

// 处理完成事件
rl.on('close', () => {
  //   console.log('All lines processed.');
  // 处理jsonArray...
  jsonArray.forEach(({ text }: { text: string }) => {
    const s = text.split('<|im_start|>');

    appendFileSync('data/test.txt', 'MESSAGE user ' + s[2].slice(5, -11).replace(/\n/g, ' ').replace(/\r/g, ' '));
    appendFileSync('data/test.txt', '\n');
    appendFileSync('data/test.txt', 'MESSAGE assistant ' + s[3].slice(10, -10).replace(/\n/g, ' ').replace(/\r/g, ' '));
    appendFileSync('data/test.txt', '\n');
  });
});
