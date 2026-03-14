// নামাজের সময় (দিন অনুযায়ী)
const prayerTimes = {
  Fajr: "05:12",
  Zohor: "12:25",
  Asr: "15:45",
  Maghrib: "18:30",
  Isha: "20:00"
};
const prayerNamesBn = { Fajr:"ফজর", Zohor:"যোহর", Asr:"আসর", Maghrib:"মাগরিব", Isha:"এশা" };

// রিয়েল-টাইম ঘড়ি
function updateClock(){
  const now = new Date();
  document.getElementById('clock').textContent = `রিয়েল-টাইম: ${now.toLocaleTimeString('bn-BD',{hour12:false})}`;
  updateNextPrayer(now);
}
setInterval(updateClock, 1000);
updateClock();

// পরবর্তী নামাজ হাইলাইট ও বাকি সময়
function updateNextPrayer(now){
  let nextPrayer=null, minDiff=Infinity;
  for(let [key, value] of Object.entries(prayerTimes)){
    let [h,m]=value.split(":").map(Number);
    let prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h,m,0);
    let diff = prayerDate - now;
    if(diff>0 && diff<minDiff){ minDiff=diff; nextPrayer=key; }
  }

  const cards = document.querySelectorAll('.prayer-card');
  cards.forEach(c=>c.classList.remove('next-prayer'));

  if(nextPrayer){
    const nextCard = Array.from(cards).find(c=>c.textContent.includes(prayerNamesBn[nextPrayer]));
    if(nextCard) nextCard.classList.add('next-prayer');
    const minutes = Math.floor(minDiff/1000/60);
    const seconds = Math.floor(minDiff/1000%60);
    document.getElementById('nextPrayerTime').textContent = `পরবর্তী নামাজ: ${prayerNamesBn[nextPrayer]} (${minutes} মিনিট ${seconds} সেকেন্ড বাকি)`;
  } else {
    document.getElementById('nextPrayerTime').textContent = "আজ সব নামাজ হয়ে গেছে।";
  }
}

// Hero Slide
const slides = ["Muslim Cultural Centre Kaktoil BD","সমাজে মিলন, ধর্মীয় শিক্ষা ও সাংস্কৃতিক উদ্দীপনা","যোগাযোগ করুন ও আমাদের সাথে যুক্ত হোন"];
let slideIndex=0;
function showSlide(){ 
  document.getElementById('heroSlide').textContent=slides[slideIndex]; 
  slideIndex=(slideIndex+1)%slides.length; 
}
setInterval(showSlide,4000);