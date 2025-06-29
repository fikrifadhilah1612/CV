document.addEventListener('DOMContentLoaded', function() {

    // --- Efek yang Sudah Ada ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const roles = ["ICT Support", "System Administrator", "Automation Enthusiast", "Problem Solver", "Network Engineering"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            const typingSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typingSpeed);
        }
        type();
    }

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    revealElements.forEach(el => revealObserver.observe(el));
    
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeToggle.checked = true;
        }
    }
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- FITUR BARU & PERBAIKAN ---

    // Inisialisasi Terminal Langsung
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
        initTerminal();
    }

    // Konfigurasi dan Pemuatan Efek Partikel
    const particlesConfig = {
        fpsLimit: 60,
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 }},
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 100 },
                push: { quantity: 4 }
            }
        },
        detectRetina: true
    };
    if (document.getElementById('hero')) {
        tsParticles.load({ id: "hero", options: particlesConfig });
    }

    // 1. Efek Kursor Hybrid (Dot & Outline)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Lakukan pengecekan apakah kedua elemen ada
if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Gerakkan titik kecil secara instan, menempel di kursor
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Gerakkan lingkaran luar dengan sedikit jeda menggunakan animate()
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" }); // durasi 500ms untuk efek lag
    });

    const interactiveElements = document.querySelectorAll('a, button, .tech-item, .certificate-card, input, textarea, .control-btn');

    // Efek hover hanya berlaku pada lingkaran luar
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}


    // 2. Scroll Progress Bar & Back to Top Button
    const progressBar = document.getElementById('progress-bar');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if(progressBar) progressBar.style.width = `${scrollPercent}%`;
        if (scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    window.addEventListener('scroll', updateScrollProgress);
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Magnetic Effect
    document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.1)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0,0) scale(1)';
        });
    });

    // 4. Interactive Terminal (Fungsi-fungsinya)
    const commands = {
        help: `Command Available:
- <span style="color:#00A1FF;">whoami</span>     : Menampilkan bio singkat.
- <span style="color:#00A1FF;">skills</span>     : Menampilkan daftar keahlian teknis.
- <span style="color:#00A1FF;">projects</span>   : Menampilkan beberapa proyek unggulan.
- <span style="color:#00A1FF;">contact</span>    : Menampilkan cara menghubungi saya.
- <span style="color:#00A1FF;">clear</span>      : Membersihkan terminal.`,
        whoami: "I am Ahmad Fikri Fadhilah, a System Administrator and ICT Support with a passion for efficient automation and infrastructure. I like to solve problems and make the system run better.",
        skills: "Main expertise: Linux & Windows Server, Network (Cisco, Microtic), Virtualization (VMware, Proxmox), Cloud (AWS, Azure), Scripting (Bash, PowerShell), and Automation (Ansible, n8n).",
        projects: "Some important projects: Migration of physical servers to virtual, implementation of pfSense firewalls, and development of automation workflows with n8n. Type 'scroll up' to see more details on this page.",
        contact: "You can contact me via email at <a href='mailto:fikryfadhillah15023@gmail.com'>fikryfadhillah15023@gmail.com</a> or visit the profile <a href='#' target='_blank'>LinkedIn</a> me.",
        'sudo rm -rf /': "Nice try. Access denied. :)"
    };

    function createTerminalLine(content, isCommand = false) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        if (isCommand) {
            line.classList.add('command');
            line.innerHTML = content;
        } else {
            line.innerHTML = content;
        }
        terminalBody.appendChild(line);
    }
    
    function processCommand(cmd) {
        createTerminalLine(cmd, true);
        const output = commands[cmd] || `Command not found: ${cmd}. Type 'help' for the command list.`;
        createTerminalLine(output);
    }
    
    function initTerminal() {
        terminalBody.innerHTML = ''; // Pastikan bersih sebelum init
        createTerminalLine("Welcome to my portfolio!");
        createTerminalLine(`Last login: ${new Date().toUTCString()} on portfolio_v2`);
        createTerminalLine("Type 'help' to start.");
        createInputLine();
    }
    
    function createInputLine() {
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-line terminal-input-line';
        inputLine.innerHTML = `<span class="input-prefix">$ </span><input type="text" id="terminal-input" autocomplete="off">`;
        terminalBody.appendChild(inputLine);
        const inputField = document.getElementById('terminal-input');
       // inputField.focus();
        
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = inputField.value.trim().toLowerCase();
                inputLine.remove();
                if (command === 'clear') {
                    terminalBody.innerHTML = '';
                } else if (command) {
                    processCommand(command);
                }
                createInputLine();
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

   
    // 5. FUNGSI MUSIK LATAR (VERSI SCROLL-TRIGGER)
    const audio = document.getElementById('background-audio');
    const muteBtn = document.getElementById('mute-btn');
    if (audio && muteBtn) {
        const muteIcon = muteBtn.querySelector('i');
        let isMusicPlaying = false;

        const startMusic = () => {
            if (!isMusicPlaying) {
                audio.volume = 0.3;
                let playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Gagal memulai audio:", error);
                    });
                }
                isMusicPlaying = true;
            }
        };

        window.addEventListener('scroll', startMusic, { once: true });

        muteBtn.addEventListener('click', () => {
            if (!isMusicPlaying) {
                startMusic();
            }
            audio.muted = !audio.muted;
            if (audio.muted) {
                muteIcon.classList.remove('fa-volume-high');
                muteIcon.classList.add('fa-volume-xmark');
            } else {
                muteIcon.classList.remove('fa-volume-xmark');
                muteIcon.classList.add('fa-volume-high');
            }
        });
    }

});