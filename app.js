const cursorDot = document.querySelector("[data-cursor-dot]");
const welcome = document.querySelectorAll('.welcome path');
const dots = [];
let timeoutId;
console.log(welcome)
window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    

    cursorDot.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 50, fill: "forwards" });
});

// ----------------------
let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
}

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;
  
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
      selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
      px = value => withUnit(value, "px"),
      ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
        diffY = b.y - a.y;
  
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
      removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createStar = position => {
  const star = document.createElement("span"),
        color = selectRandom(config.colors);
  
  star.className = "star fa-solid fa-sparkle";
  
  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);
  
  appendElement(star);

  removeElement(star, config.starAnimationDuration);
}

const createGlowPoint = position => {
  const glow = document.createElement("div");
  
  glow.className = "glow-point";
  
  glow.style.left = px(position.x);
  glow.style.top = px(position.y);
  
  appendElement(glow)
  
  removeElement(glow, config.glowDuration);
}

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);
const createGlow = (last, current) => {
    const distance = calcDistance(last, current),
          quantity = determinePointQuantity(distance);
    
    const dx = (current.x - last.x) / quantity,
          dy = (current.y - last.y) / quantity;
    
    Array.from(Array(quantity)).forEach((_, index) => { 
      const x = last.x + dx * index, 
            y = last.y + dy * index;
      
      createGlowPoint({ x, y });
    });
  }
  
  const updateLastStar = position => {
    last.starTimestamp = new Date().getTime();
  
    last.starPosition = position;
  }
  
  const updateLastMousePosition = position => last.mousePosition = position;
  
  const adjustLastMousePosition = position => {
    if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
      last.mousePosition = position;
    }
  };
  
  const handleOnMove = e => {
    const mousePosition = { x: e.clientX, y: e.clientY }
    
    adjustLastMousePosition(mousePosition);
    
    const now = new Date().getTime(),
          hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
          hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;
    
    if(hasMovedFarEnough || hasBeenLongEnough) {
      createStar(mousePosition);
      
      updateLastStar(mousePosition);
    }
    
    createGlow(last.mousePosition, mousePosition);
    
    updateLastMousePosition(mousePosition);
  }
  
  window.onmousemove = e => handleOnMove(e);
  
  window.ontouchmove = e => handleOnMove(e.touches[0]);
  
  document.body.onmouseleave = () => updateLastMousePosition(originPosition);

// ----- random text on hover -----
function changeTitle() {
    var mailtexts = [
        "feel free to send message",
        "I am waiting for your mail",
        "Very much excited for your mail",
        "Excited for your email.",
        "Message me anytime.",
        "Eagerly awaiting your mail.",
        "Drop a line soon.",
        "Excitedly anticipating your email arrival.",
        "Your mail would be appreciated greatly.",
        "Drop a line whenever you can.",
        "Message me; I'm ready anytime.",
        "Your email will make my day.",
        "Eagerly waiting for your correspondence.",
        "Can't wait to read your message.",
        "Mail me; I'm waiting eagerly.",
        "Excited for the arrival of email.",
        "Drop me a line and make my inbox smile!",
        "Can't wait for your email to shine in.",
        "Your email is the missing puzzle piece!",
        "Slide into my inbox whenever you please.",
        "Your message would be the digital hug!",
        "Anticipating your email like a pro.",
        "Your mail would be a digital delight!",
        "Hit me up whenever you want!",

    ];
    var gitTexts = ["Follow me on GitHub, let's code!",
    "Collaborators welcome, let's build together.",
    "Connect for coding adventures on GitHub.",
    "Explore my repos, open to collaborations.",
    "Follow me for coding insights and collaboration.",
    "GitHub is for shared learning, join me!",
    "Seeking collaborators for projects, join in!",
    "Let's exchange ideas on GitHub, follow along.",
    "Open to discussions and collabs on GitHub.",
    "Let's code and learn together.",
    "Looking for coding buddies on GitHub!",
    "Follow for coding vibes and collaboration.",
    "Connect for collaborative coding on GitHub.",
    "Seeking coding partners, let's innovate!",
    "Explore, collaborate, and code on GitHub.",
    "Collaborate with me on GitHub projects!",
    "Follow for coding challenges, join in.",
    "the hub for collaboration.",
    "Let's build cool things on GitHub!"

    ];
    var linkedinTexts = [
        "Keen to connect and grow together!",
"Let's build a network of success!",
"Join me for a LinkedIn journey.",
"Ready to connect for new opportunities?",
"Connecting minds, let's link up!",
"Expand your network, connect with me.",
"Open to connecting with professionals.",
"Let's bridge the professional gap!",,
"Exploring connections—care to join?",
"Connect for shared insights and growth.",
"Building bridges, one connection at a time.",
"Ready to connect and collaborate!",
"Open to connecting for mutual inspiration.",
"Let's create a network of possibilities.",
"Building a LinkedIn community—come join!",
"Keen on connections, let's link up!",
"Connect for a journey of professional growth.",
"Ready to connect for shared success stories?",
"Join me in the world of professional connections!",
"Connecting dots, one connection at a time.",
"Let's connect for mutual empowerment!",
"Open to connecting minds for collaboration.",
"Keen on connections—let's make it happen!",
"Ready to connect for a shared professional voyage?",
"Building bridges on LinkedIn—care to join me?",
"Connect for insights, inspiration, and innovation.",
"Let's create a tapestry of professional connections.",
"Keen on connecting? Let's start a conversation!",
"Open to connecting with like-minded professionals.",
"Join me in the LinkedIn community!",
"Connecting for shared learnings and successes.",
"Ready to connect and explore opportunities together?",
"Building a network of excellence—let's connect!",
"Keen on connections for mutual growth and support.",
"Open to connecting for a world of possibilities.",
"Let's connect for a journey of professional exploration.",
"Building bridges to new opportunities—connect with me!",
"Keen on connections that matter—let's connect!",
"Open to connecting with professionals for shared success.",
"Join me in creating a network of positive change!",
"Ready to connect for shared insights and inspiration?",
"Building bridges, one LinkedIn connection at a time.",
"Keen on connections that elevate—let's link up!",
"Open to connecting with professionals on a similar path.",
"Let's create a network that thrives—connect with me!",
"Connecting for shared aspirations and professional journey.",
"Ready to connect for a world of shared opportunities?",
"Building bridges to excellence—connect for growth!",
"Keen on connections that make a difference—let's link up!",
"Open to connecting for a journey of shared successes"
    ];


    var randomMailText = mailtexts[Math.floor(Math.random() * mailtexts.length)];
    var gitTexts = gitTexts[Math.floor(Math.random() * gitTexts.length)];
    var linkedinTexts = linkedinTexts[Math.floor(Math.random() * linkedinTexts.length)];


    document.querySelector('.mailtext').textContent = randomMailText;
    document.querySelector('.gittext').textContent = gitTexts;
    document.querySelector('.linkedintext').textContent = linkedinTexts;

}