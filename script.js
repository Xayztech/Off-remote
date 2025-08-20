// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

    // === MEMILIH ELEMEN DARI HTML ===
    const loginContainer = document.getElementById('login-container');
    const loadingContainer = document.getElementById('loading-container');
    const finalContainer = document.getElementById('final-container');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const asciiDanceEl = document.getElementById('ascii-dance');
    const loadingTextEl = document.getElementById('loading-text');

    // === DATA YANG DIPERLUKAN ===
    const correctUsername = "XYCoolcraft";
    const correctPassword = "XAYZCOLD";
    
    // Frame untuk animasi ASCII Dance
    const danceFrames = [
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
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     `
    ];
    
    // --- PERUBAIKAN 1: Membuat fungsi khusus untuk meminta layar penuh ---
    /**
     * Fungsi ini hanya bertanggung jawab untuk meminta browser masuk ke mode fullscreen.
     * Dibuat terpisah agar bisa dipanggil kapan saja tanpa mengulang logika lain.
     */
    function requestAndTrapFullscreen() {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen().catch(err => console.error(err));
        } else if (docEl.mozRequestFullScreen) { // Firefox
            docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) { // Chrome, Safari, Opera
            docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) { // IE/Edge
            docEl.msRequestFullscreen();
        }
    }


    // === FUNGSI-FUNGSI UTAMA ===

    /**
     * Fungsi untuk memulai animasi loading
     */
    function startLoading() {
        loginContainer.classList.add('hidden');
        loadingContainer.classList.remove('hidden');

        let frameIndex = 0;
        let percentage = 0;

        const danceInterval = setInterval(() => {
            asciiDanceEl.textContent = danceFrames[frameIndex];
            frameIndex = (frameIndex + 1) % danceFrames.length;
        }, 200);

        // --- PERUBAIKAN 2: Mengubah durasi interval menjadi 2000ms (2 detik) ---
        const percentageInterval = setInterval(() => {
            percentage++;
            loadingTextEl.textContent = `|⟩›» ${percentage}% «‹⟨|`;

            if (percentage >= 100) {
                clearInterval(danceInterval);
                clearInterval(percentageInterval);
                enterFinalState();
            }
        }, 2000); // 1% setiap 2 detik
    }

    /**
     * Fungsi untuk menampilkan layar final dan mengelola timer
     */
    function enterFinalState() {
        loadingContainer.classList.add('hidden');
        finalContainer.classList.remove('hidden');
        
        // Panggil fungsi untuk masuk layar penuh untuk pertama kalinya
        requestAndTrapFullscreen();
        
        let minutesLeft = 4;

        // Atur timer untuk menampilkan pop-up setiap 1 menit (60000 ms)
        // Timer ini hanya akan diatur satu kali saja.
        const minuteTimer = setInterval(() => {
            if (minutesLeft > 0) {
                alert(`Remaining - ${minutesLeft} Minute`);
                minutesLeft--;
            } else {
                clearInterval(minuteTimer);
                 // Setelah 5 menit, kita bisa reload halaman untuk mengakhiri
                window.location.reload();
            }
        }, 60000);
    }
    
    // === EVENT LISTENERS ===
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        if (usernameInput.value === correctUsername && passwordInput.value === correctPassword) {
            startLoading();
        } else {
            alert("Username atau Password salah!");
        }
    });

    // --- PERUBAIKAN 1 (Lanjutan): Memperbaiki logika event listener fullscreenchange ---
    /**
     * Event listener ini sekarang lebih sederhana.
     * Jika mendeteksi keluar dari layar penuh, ia akan menampilkan alert
     * dan langsung memanggil fungsi `requestAndTrapFullscreen` untuk memaksa masuk kembali.
     */
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            alert("You Can't Get Out!!");
            requestAndTrapFullscreen(); // Paksa kembali ke layar penuh
        }
    });
});
