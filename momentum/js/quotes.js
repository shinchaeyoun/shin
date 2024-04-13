const quotes = [
  {
    text: '',
    author: ''
  },
  {
    text: '언제든 여기 비워둘게 누가 또 울렸어 못되게 굴었어 하나도 한명도 빠짐없이 얘기해줘 이야기가 길어지더라도 밤새 계속 네 편이 되어줄게 기대 팔배게로',
    author: '기대'
  },
  {
    text: '나를 숨쉬게 하는 모든것이 그저 간단했으면 해',
    author: 'SIMPLE'
  },
  {
    text: '우린 정말 무슨 일 있어도 언제나 그랬듯 함께 있을 거에요',
    author: '웃음꽃'
  },
  {
    text: '지친 하루 끝에 수고했단 작은 그 한마딘 훗날에 기억될 오늘의 그림 같은 지금의 추억이 될 거예요',
    author: '힐링'
  },
  {
    text: '슬픔보다 찬란한 매일 너에게 괜찮아 너의 세상은 지금의 너 그대로 소중하고 또 소중해서',
    author: '어른아이'
  },
  {
    text: '우리 여정은 끝이 없겠지만 오늘은 잠깐 쉬어가도 돼',
    author: 'HOME;RUN'
  },
  {
    text: '서두르지마 늘 충분하니까 그대로 있어도 돼 나의 여행의 시작은 나야',
    author: 'My My'
  }
];

const quote = document.querySelector('#quotes div:first-child');
const author = document.querySelector('#quotes div:last-child');
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = randomQuote.text;
author.innerText = randomQuote.author;