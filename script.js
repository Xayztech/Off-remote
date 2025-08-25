document.addEventListener('DOMContentLoaded', () => {

    const loginContainer = document.getElementById('login-container');
    const loadingContainer = document.getElementById('loading-container');
    const finalContainer = document.getElementById('final-container');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const asciiDanceEl = document.getElementById('ascii-dance');
    const loadingTextEl = document.getElementById('loading-text');
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01';
    const charArray = characters.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 33);

    const correctUsername = "XYCoolcraft";
    const correctPassword = "XAYZCOLD";
    const danceFrames = [` /$$   /$$ /$$ /$$
| $$  | $$|__/| $$
| $$  | $$ /$$| $$
| $$$$$$$$| $$| $$
| $$__  $$| $$|__/
| $$  | $$| $$    
| $$  | $$| $$ /$$
|__/  |__/|__/|__/
                  
                  
                  `,
        `                                                     
                                                     
YYYYYYY       YYYYYYY                                
Y:::::Y       Y:::::Y                                
Y:::::Y       Y:::::Y                                
Y::::::Y     Y::::::Y                                
YYY:::::Y   Y:::::YYYooooooooooo   uuuuuu    uuuuuu  
   Y:::::Y Y:::::Y oo:::::::::::oo u::::u    u::::u  
    Y:::::Y:::::Y o:::::::::::::::ou::::u    u::::u  
     Y:::::::::Y  o:::::ooooo:::::ou::::u    u::::u  
      Y:::::::Y   o::::o     o::::ou::::u    u::::u  
       Y:::::Y    o::::o     o::::ou::::u    u::::u  
       Y:::::Y    o::::o     o::::ou::::u    u::::u  
       Y:::::Y    o::::o     o::::ou:::::uuuu:::::u  
       Y:::::Y    o:::::ooooo:::::ou:::::::::::::::uu
    YYYY:::::YYYY o:::::::::::::::o u:::::::::::::::u
    Y:::::::::::Y  oo:::::::::::oo   uu::::::::uu:::u
    YYYYYYYYYYYYY    ooooooooooo       uuuuuuuu  uuuu
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     `,
        ` /$$   /$$ /$$ /$$
| $$  | $$|__/| $$
| $$  | $$ /$$| $$
| $$$$$$$$| $$| $$
| $$__  $$| $$|__/
| $$  | $$| $$    
| $$  | $$| $$ /$$
|__/  |__/|__/|__/
                  
                  
                  `,
        `                                                     
                                                     
YYYYYYY       YYYYYYY                                
Y:::::Y       Y:::::Y                                
Y:::::Y       Y:::::Y                                
Y::::::Y     Y::::::Y                                
YYY:::::Y   Y:::::YYYooooooooooo   uuuuuu    uuuuuu  
   Y:::::Y Y:::::Y oo:::::::::::oo u::::u    u::::u  
    Y:::::Y:::::Y o:::::::::::::::ou::::u    u::::u  
     Y:::::::::Y  o:::::ooooo:::::ou::::u    u::::u  
      Y:::::::Y   o::::o     o::::ou::::u    u::::u  
       Y:::::Y    o::::o     o::::ou::::u    u::::u  
       Y:::::Y    o::::o     o::::ou::::u    u::::u  
       Y:::::Y    o::::o     o::::ou:::::uuuu:::::u  
       Y:::::Y    o:::::ooooo:::::ou:::::::::::::::uu
    YYYY:::::YYYY o:::::::::::::::o u:::::::::::::::u
    Y:::::::::::Y  oo:::::::::::oo   uu::::::::uu:::u
    YYYYYYYYYYYYY    ooooooooooo       uuuuuuuu  uuuu
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     `];
    
    function requestAndTrapFullscreen() {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen().catch(err => console.error(`Error: ${err.message}`));
        } else if (docEl.mozRequestFullScreen) {
            docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) {
            docEl.msRequestFullscreen();
        }
    }

    function startLoading() {
        loginContainer.classList.add('hidden');
        loadingContainer.classList.remove('hidden');
        requestAndTrapFullscreen();
        
        let frameIndex = 0;
        let percentage = 0;
        
        const danceInterval = setInterval(() => {
            asciiDanceEl.textContent = danceFrames[frameIndex];
            frameIndex = (frameIndex + 1) % danceFrames.length;
        }, 200);
        
        const percentageInterval = setInterval(() => {
            percentage++;
            loadingTextEl.textContent = `| ${percentage}% |`;
            if (percentage >= 100) {
                clearInterval(danceInterval);
                clearInterval(percentageInterval);
                enterFinalState();
            }
        }, 2000);
    }

    function enterFinalState() {
        loadingContainer.classList.add('hidden');
        finalContainer.classList.remove('hidden');
        
        let minutesLeft = 4;
        const minuteTimer = setInterval(() => {
            if (minutesLeft > 0) {
                alert(`Remaining - ${minutesLeft} Minute`);
                minutesLeft--;
            } else {
                clearInterval(minuteTimer);
                window.location.reload();
            }
        }, 60000);
    }
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        if (usernameInput.value === correctUsername && passwordInput.value === correctPassword) {
            document.body.classList.add('flashing');
            startLoading();
        } else {
            alert("Username atau Password salah!");
        }
    });

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            alert("Bro Berusaha Untuk Keluar😹😹😹 👉🏻😜 || #mikirkids👉🏻😜");
            requestAndTrapFullscreen();
        }
    });
});