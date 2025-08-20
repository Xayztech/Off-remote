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

    // === FUNGSI-FUNGSI UTAMA ===

    /**
     * Fungsi untuk memulai animasi loading
     */
    function startLoading() {
        // Sembunyikan login, tampilkan loading
        loginContainer.classList.add('hidden');
        loadingContainer.classList.remove('hidden');

        let frameIndex = 0;
        let percentage = 0;

        // Atur interval untuk mengubah frame ASCII dance setiap 200ms
        const danceInterval = setInterval(() => {
            asciiDanceEl.textContent = danceFrames[frameIndex];
            frameIndex = (frameIndex + 1) % danceFrames.length;
        }, 200);

        // Atur interval untuk menaikkan persentase loading setiap 40ms
        const percentageInterval = setInterval(() => {
            percentage++;
            loadingTextEl.textContent = `| ${percentage}% |`;

            // Jika sudah 100%, hentikan interval dan mulai layar final
            if (percentage >= 100) {
                clearInterval(danceInterval);
                clearInterval(percentageInterval);
                enterFinalState();
            }
        }, 40);
    }

    /**
     * Fungsi untuk menampilkan layar final dan mengelola timer
     */
    function enterFinalState() {
        // Sembunyikan loading, tampilkan layar final
        loadingContainer.classList.add('hidden');
        finalContainer.classList.remove('hidden');

        const docEl = document.documentElement;

        // Meminta browser untuk masuk mode fullscreen
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.mozRequestFullScreen) { // Firefox
            docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) { // Chrome, Safari, Opera
            docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) { // IE/Edge
            docEl.msRequestFullscreen();
        }
        
        let minutesLeft = 4; // Mulai dari 4 agar pop-up pertama muncul setelah 1 menit

        // Atur timer untuk menampilkan pop-up setiap 1 menit (60000 ms)
        const minuteTimer = setInterval(() => {
            if (minutesLeft > 0) {
                alert(`Remaining - ${minutesLeft} Minute`);
                minutesLeft--;
            } else {
                // Setelah 5 menit, hentikan timer
                clearInterval(minuteTimer);
                // (Opsional) bisa ditambahkan aksi lain seperti keluar dari fullscreen
                // if (document.exitFullscreen) document.exitFullscreen();
            }
        }, 60000); // 1 menit
    }
    
    // === EVENT LISTENERS ===
    
    // Event listener untuk form login
    loginForm.addEventListener('submit', (event) => {
        // Mencegah form mengirim data dan me-refresh halaman
        event.preventDefault(); 
        
        // Cek apakah username dan password cocok
        if (usernameInput.value === correctUsername && passwordInput.value === correctPassword) {
            startLoading();
        } else {
            alert("Username atau Password salah!");
        }
    });

    // Event listener untuk mendeteksi usaha keluar dari fullscreen
    document.addEventListener('fullscreenchange', () => {
        // Jika tidak ada elemen yang dalam mode fullscreen, berarti pengguna mencoba keluar
        if (!document.fullscreenElement) {
            alert("You Can't Get Out!!");
            // Paksa masuk kembali ke fullscreen
            enterFinalState();
        }
    });
});