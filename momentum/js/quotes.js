const quotes = [
  {
    text: 'When you have faults, do not fear to abandon them.',
    author: 'Confucius',
    translation: '허물이 있다면, 버리기를 두려워 말라.',
    authorKr: '공자',
  },
  {
    text: 'Age is no guarantee of maturity.',
    author: 'Lawana Blackwell',
    translation: '나이가 성숙을 보장하지는 않는다.',
    authorKr: '라와나 블랙웰',
  },
  {
    text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela',
    translation: '인생에서 가장 큰 영광은 넘어지지 않는 것에 있는 것이 아니라 매번 일어선다는 데 있다.',
    authorKr:'넬슨 만델라'
  },
  {
    text: 'Life is either a daring adventure or nothing at all.',
    author: 'Helen Keller',
    translation: '생활은 과감한 모험이거나 아니면 아무것도 아니다.',
    authorKr: ' 헬렌 켈러'
  },
  {
    text: 'The goal of life is living in agreement with nature.',
    author: 'Zeno',
    translation: '자연과 조화롭게 살아가는 것이 삶의 목적이다.',
    authorKr: '제노',
  },
  {
    text: 'This too shall pass.',
    author: 'Et hoc transibit',
    translation: '이 또한 지나가리라.',
    authorKr: '에트 혹 트란시비트',
  },
  {
    text: 'The die is cast.',
    author: 'Julius caesar',
    translation: '주사위는 던져졌다.',
    authorKr: '줄리어스 시저',
  },
  {
    text: 'Only I can change me life, no one can do it for me.',
    author: 'Carol Burnett',
    translation: '내 인생을 바꾸는 사람은 자신입니다. 아무도 대신해줄 수 없어요.',
    authorKr: '캐롤 버넷',
  },
  {
    text: 'When in doubt, choose change.',
    author: 'Lily leung',
    translation: '의심이 있다면, 변화해라.',
    authorKr: '릴리 렁',
  },
  {
    text: 'Being happy never goes out of style.',
    author: 'Lilly Pulitzer',
    translation: '즐거움은 영원히 유행에 뒤떨어지지 않는다.',
    authorKr: '릴리 퓰리처',
  },
  {
    text: 'Life is a mountain. Your goal is to find your path, not to reach the top.',
    author: 'Maxime Lagacé',
    translation: '인생은 산이다. 당신의 목표는 정상에 도달하는 것이 아니라 당신의 길을 찾는 것이다.',
    authorKr: '막심 라가세',
  },
  {
    text: 'Life is from the inside out. When you shift on the inside, life shifts on the outside.',
    author: 'Kamal Ravikant',
    translation: '인생은 내면으로부터 나온다. 당신이 내면을 바꿀 때, 삶은 외부로 바뀐다.',
    authorKr: '카말 라비칸트',
  },
  {
    text: 'It is better to fail in originality than to succeed in imitation.',
    author: 'Herman Melville',
    translation: '모방에서 성공하기보다는 독창성에서 실패하는 것이 낫다.',
    authorKr: '허먼 멜빌',
  },
  {
    text: 'Study the past if you would define the future.',
    author: 'Confucius',
    translation: '앞날을 결정짓고자 하면 옛것을 공부하라.',
    authorKr: '공자',
  },
  {
    text: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
    translation: '앞서가는 방법의 비밀은 시작하는 것이다.',
    authorKr: '마크 트웨인',
  },
  {
    text: 'The merit of an action lies in finishing it to the end.',
    author: 'Genghis Khan',
    translation: '행동의 가치는 그 행동을 끝까지 이루는 데 있다.',
    authorKr: '칭기츠칸',
  },
  {
    text: 'Isn’t it a pleasure to study, and to practice what you have learned?',
    author: 'Confucius',
    translation: '배우고 때로 익히면 또한 기쁘지 아니한가.',
    authorKr: '공자',
  }
];

const quote = document.querySelector('#quotes div:first-child');
const quoteKr = document.querySelector('#quotes div:nth-child(2)');
const author = document.querySelector('#quotes div:last-child');
// const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = randomQuote.translation;
author.innerText = randomQuote.authorKr;