document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Theme Management (Light / Dark Mode)
    // -------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // -------------------------------------------------------------
    // 2. Language Toggle (CS / EN)
    // -------------------------------------------------------------
    const translations = {
        cs: {
            'nav-home': 'Domů',
            'nav-about': 'O mně',
            'nav-contact': 'Kontakt',
            'footer-rights': 'Všechna práva vyhrazena.',
            'conclusion-label': 'Závěr:',

            'hero-subtitle': 'KYBERBEZPEČNOST • IT • AI',
            'hero-intro': 'Zajímám se o technologie, kyberbezpečnost a umělou inteligenci. Vytvářím experimentální projekty, věnuji se samostudiu IT a pravidelně zkoumám moderní směry jako je reinforcement learning či predikce trhů pomocí LLM.',
            'btn-view-projects': 'Prohlédnout Projekty →',
            'btn-send-message': 'Napsat Zprávu',
            'specialties-heading': 'Klíčová Zaměření',
            'spec-security-title': 'Kyberbezpečnost',
            'spec-security-desc': 'Zaměření na bezpečnost sítí, Linux nástroje, analýzu zranitelností a bezpečnostní standardy. Pravidelný účastník Kybersoutěže.',
            'spec-ai-title': 'Umělá Inteligence',
            'spec-ai-desc': 'Zkoumání velkých jazykových modelů, fyzické modelování posilovaného učení (MENACE) a integrace API pro inteligentní nástroje.',
            'spec-dev-title': 'Vývoj Aplikací',
            'spec-dev-desc': 'Rychlé prototypování (vibe coding), vývoj v Pythonu (hry, API utility) a tvorba moderních, čistých uživatelských rozhraní.',

            'portfolio-heading': 'Mé Projekty',
            'portfolio-intro': 'Níže naleznete mé experimentální a studijní projekty rozdělené podle kategorií. Baví mě zkoumat limity technologií a propojovat různé oblasti.',
            'filter-all': 'Všechny',
            'filter-ai-ml': 'AI & Strojové učení',
            'filter-security-btn': 'Kyberbezpečnost',
            'filter-dev-btn': 'Vývoj aplikací',
            'proj1-title': 'Predikce akcií pomocí LLM',
            'proj1-desc': 'Experimentální projekt zkoumající reálnou schopnost velkých jazykových modelů předpovídat krátkodobý i dlouhodobý vývoj akciového trhu.',
            'proj1-conclusion': 'Současné LLM nejsou vhodné pro spolehlivou predikci, ale slouží výborně pro rychlou sumarizaci sentimentu a zpráv.',
            'dl-approach': 'Přístup:',
            'dl-results': 'Výsledky:',
            'dl-learned': 'Naučeno:',
            'dl-methods': 'Metody:',
            'dl-principle': 'Princip:',
            'dl-photodoc': 'Fotodokumentace:',
            'dl-multtable': 'Učitel násobilky:',
            'dl-wordle': 'Wordle Klon:',
            'dl-sigma': 'Projekt Sigma:',
            'proj1-approach': 'Testováno bez instrukcí, následně s napojením na Python Yahoo Finance API (analyzováno 50 předních akcií) a zohledněním mediálních zpráv.',
            'proj1-results-link': 'Google Sheets tabulka',
            'proj1-learned': 'Analýza trhu, Google Sheets API, limity kontextu AI modelů.',
            'proj2-title': 'Příprava na Kybersoutěž & CTF',
            'proj2-desc': 'Teoretická i praktická příprava na celosátní Kybersoutěž, kde jsem v juniorské kategorii v Praze obsadil 3. místo.',
            'proj2-methods': 'Studium síťové architektury (ISO/OSI, protokoly), práce s Linux utilitami, analýza Wireshark logů, kryptografia (šifry, hashe).',
            'proj2-learned': 'Penetrační testování, bezpečné konfigurace systémů, kryptografické principy a základy forenzní analýzy.',
            'proj2-conclusion': 'Kyberbezpečnost vyžaduje neustálé sledování nových zranitelností a hluboké porozumění nízkoúrovňovým systémům.',
            'proj3-title': 'MENACE (1961 Remake)',
            'proj3-desc': 'Fyzický, mechanický model strojového učení pro hru piškvorky vytvořený na základě legendárního konceptu Donalda Michieho z roku 1961.',
            'proj3-principle': 'Systém krabiček se sirkami, kde každá krabička reprezentuje jedinečný stav hrací plochy. Model se učí metodou pokusu a omylu (trestů a odměn).',
            'proj3-photodoc-link': 'Snímky na Google Disku',
            'proj3-learned': 'Principy posilovaného učení (Reinforcement Learning) bez nutnosti zapojit procesor.',
            'proj3-conclusion': 'Fascinující ukázka toho, že algoritmy strojového učení jsou založené na čisté matematické a logické struktuře, nikoliv na digitálním hardwaru.',
            'proj4-title': 'Python Mini-Aplikace',
            'proj4-desc': 'Sada menších, funkčních projektů vytvořených za účelem pochopení programovací syntaxe a integrace externích služeb.',
            'proj4-multtable-text': 'Interaktivní program využívající ChatGPT API k tvorbě personalizovaných příkladů a slovní podpory.',
            'proj4-multtable-link': 'GitHub repozitář',
            'proj4-wordle-text': 'Webová předělávka slavné slovní hry s českým slovníkem.',
            'proj4-wordle-link': 'Vyzkoušet hru',
            'proj4-learned': 'OOP v Pythonu, práce s JSON a REST API, herní smyčky a stavové automaty.',
            'proj5-title': 'Vibecoding & Sigma',
            'proj5-desc': 'Experimenty s rychlým vývojem pomocí AI asistentů (Google Antigravity) a verzováním přes Git/GitHub.',
            'proj5-sigma-text': 'Interaktivní webová napodobenina fiktivního prohlížeče z hororové hackerské hry Welcome to the Game (WTTG) 3.',
            'proj5-sigma-link': 'Přejít na web Sigma',
            'proj5-learned': 'Agilní prototyping, prompt engineering, řešení verzovacích konfliktů, nasazení přes GitHub Pages.',
            'proj5-conclusion': 'AI nástroje dramaticky urychlují převod myšlenky ve funkční kód, klíčová je však lidská kontrola architektury.',
            'proj6-title': 'Osobní Web & Značka',
            'proj6-desc': 'Budování online identity a vlastní prezentace pomocí AI-asistovaného vývoje (vibe coding).',
            'proj6-site-text': 'Kompletní osobní web vibecódovaný s pomocí AI nástrojů. Moderní design, plně responzivní.',
            'proj6-site-link': 'Navštívit web',
            'proj6-learned': 'Rychlý prototyping s AI, správa hostingu, CSS Grid/Flexbox a nasazení na vlastní doménu.',
            'proj6-conclusion': 'Vibe coding dramaticky zkracuje cestu od nápadu k funkčnímu webu – klíčem je správně definovat záměr a výsledek zkontrolovat.',

            'about-journey-heading': 'Moje Cesta',
            'about-journey-intro': 'Jsem student se silnou vášní pro moderní technologie, IT a kybernetickou bezpečnost. Fascinuje mě, jak se digitální svět propojuje s reálným životem – od sportovní telemetrie ve Formuli 1 po logické základy mechanických modelů umělé inteligence.',
            'about-achievements-heading': 'Cesta & Úspěchy',
            'timeline1-title': 'Politická soutěž v NextZone',
            'timeline1-desc': 'Účast a prezentace na SSPŠ (Smíchovská střední průmyslová škola a gymnázium).',
            'timeline2-title': 'Národní Kybersoutěž',
            'timeline2-desc': 'Skvělé 3. místo v juniorské kategorii v rámci hl. m. Prahy. Ověření praktických dovedností v oblasti bezpečnosti a kryptografie.',
            'timeline3-desc': 'Zisk 129 bodů v kategorii Junior, potvrzující pokročilé algoritmické a logické myšlení.',
            'timeline4-title': 'AI dětem (Brigáda)',
            'timeline4-desc': 'Technická podpora, správa a údržba počítačů a systémů, testování inovativních AI aplikací pro vzdělávání dětí.',
            'timeline5-title': 'SCIO OSP',
            'timeline5-desc': 'Vynikající 2. místo v testu Obecných studijních předpokladů (OSP) v Praze.',
            'timeline6-title': 'Vzdělávací akce & Workshopy',
            'timeline6-desc': 'Účast na IT akcích: Minecraft tábory, robotické kroužky, letní školy a odborné workshopy na SSPŠ a UŠI kempu.',
            'timeline7-title': 'Future Factory',
            'timeline7-desc': '1. místo v soutěži zaměřené na inovace a technologické návrhy budoucnosti.',
            'about-selfstudy-heading': 'Samostudium',
            'study1-desc': 'Dokončený mezinárodně uznávaný kurz zaměřený na základy umělé inteligence, algoritmy, neuronové sítě a etiku v AI.',
            'study2-title': 'Kyberbezpečnost',
            'study2-desc': 'Vlastní studijní plán generovaný a konzultovaný s ChatGPT. Zaměření na penetrační testování, Linux systémy a bezpečnost sítí.',
            'study3-desc': 'Pravidelné sledování technologických a bezpečnostních přednášek z proslulého kongresu v Hamburku (39C3).',
            'study3-link': 'Archiv přednášek →',
            'tag-certificate': 'Certifikát',
            'tag-individual': 'Individuální',
            'tag-lectures': 'Přednášky',
            'about-skills-heading': 'Dovednosti',
            'skills-tech-heading': 'Technické',
            'skills-lang-heading': 'Jazyky',
            'skill-3d': '3D modelování',
            'skill-soldering': 'Pájení',
            'skill-networking': 'Základy sítí',
            'skill-linux': 'Linux nástroje',
            'skill-html-basics': 'HTML & CSS (Základy)',
            'skill-english': 'Angličtina (B2)',
            'about-interests-heading': 'Zájmy',
            'interests-intro': 'Mimo technologie a kódování mě baví celá řada dalších aktivit:',
            'interest-f1': '🏎️ Formule 1',
            'interest-climbing': '🧗 Lezení',
            'interest-politics': '🏛️ Politika',
            'interest-sport': '⚽ Sport & Aktivní život',
            'interest-tech': '🚀 Nové technologie',

            'contact-heading': 'Spojme se',
            'contact-intro': 'Máte zájem o spolupráci na projektu, dotaz k mým experimentům, nebo mi chcete jen napsat zprávu? Neváhejte použít formulář nebo se mi ozvat napřímo.',
            'contact-direct-heading': 'Přímé Kontakty',
            'contact-direct-desc': 'Zde jsou mé oficiální komunikační kanály. Odpovídám většinou do 24 hodin.',
            'contact-email-label': 'Napište na e-mail',
            'contact-github-label': 'Sledujte mě',
            'contact-blog-label': 'Čtěte můj blog',
            'contact-form-heading': 'Napsat zprávu',
            'form-name-label': 'Jméno a příjmení',
            'form-name-placeholder': 'Jan Novák',
            'form-email-label': 'E-mailová adresa',
            'form-email-placeholder': 'jan.novak@email.cz',
            'form-message-label': 'Vaše zpráva',
            'form-message-placeholder': 'Dobrý den, zaujaly mě vaše projekty...',
            'btn-send': 'Odeslat zprávu →',
            'form-fill-error': 'Prosím vyplňte všechna pole.',
            'form-email-error': 'Zadejte prosím platnou e-mailovou adresu.',
            'form-sending': 'Odesílám zprávu...',
            'form-success': 'Zpráva byla úspěšně odeslána! Ozvu se vám co nejdříve.',
            'form-error-generic': 'Něco se nepovedlo. Zkuste to prosím později.',
            'form-error-network': 'Odeslání selhalo kvůli chybě sítě. Zkuste to prosím později.',
        },
        en: {
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-contact': 'Contact',
            'footer-rights': 'All rights reserved.',
            'conclusion-label': 'Conclusion:',

            'hero-subtitle': 'CYBERSECURITY • IT • AI',
            'hero-intro': 'I am passionate about technology, cybersecurity, and artificial intelligence. I build experimental projects, pursue self-study in IT, and regularly explore cutting-edge topics like reinforcement learning and LLM-based market prediction.',
            'btn-view-projects': 'View Projects →',
            'btn-send-message': 'Send Message',
            'specialties-heading': 'Key Focus Areas',
            'spec-security-title': 'Cybersecurity',
            'spec-security-desc': 'Focus on network security, Linux tools, vulnerability analysis, and security standards. Regular participant in the national Cybersecurity Competition.',
            'spec-ai-title': 'Artificial Intelligence',
            'spec-ai-desc': 'Exploring large language models, physical reinforcement learning (MENACE), and API integration for intelligent tools.',
            'spec-dev-title': 'App Development',
            'spec-dev-desc': 'Rapid prototyping (vibe coding), Python development (games, API utilities), and building modern, clean user interfaces.',

            'portfolio-heading': 'My Projects',
            'portfolio-intro': "Below you'll find my experimental and study projects organized by category. I enjoy pushing the limits of technology and connecting different fields.",
            'filter-all': 'All',
            'filter-ai-ml': 'AI & Machine Learning',
            'filter-security-btn': 'Cybersecurity',
            'filter-dev-btn': 'App Development',
            'proj1-title': 'LLM Stock Prediction',
            'proj1-desc': 'An experimental project exploring the real-world ability of large language models to predict short- and long-term stock market movements.',
            'proj1-conclusion': 'Current LLMs are not suitable for reliable prediction, but excel at rapid sentiment summarization and news analysis.',
            'dl-approach': 'Approach:',
            'dl-results': 'Results:',
            'dl-learned': 'Learned:',
            'dl-methods': 'Methods:',
            'dl-principle': 'Principle:',
            'dl-photodoc': 'Photo Documentation:',
            'dl-multtable': 'Multiplication Teacher:',
            'dl-wordle': 'Wordle Clone:',
            'dl-sigma': 'Sigma Project:',
            'proj1-approach': 'Tested without instructions, then connected to the Python Yahoo Finance API (50 leading stocks analyzed) and factoring in media reports.',
            'proj1-results-link': 'Google Sheets table',
            'proj1-learned': 'Market analysis, Google Sheets API, context limits of AI models.',
            'proj2-title': 'Cybersecurity Competition & CTF Prep',
            'proj2-desc': 'Theoretical and practical preparation for the national Cybersecurity Competition, where I placed 3rd in the junior category in Prague.',
            'proj2-methods': 'Study of network architecture (ISO/OSI, protocols), working with Linux utilities, Wireshark log analysis, cryptography (ciphers, hashes).',
            'proj2-learned': 'Penetration testing, secure system configurations, cryptographic principles, and basics of forensic analysis.',
            'proj2-conclusion': 'Cybersecurity requires constant monitoring of new vulnerabilities and deep understanding of low-level systems.',
            'proj3-title': 'MENACE (1961 Remake)',
            'proj3-desc': "A physical, mechanical machine learning model for tic-tac-toe based on Donald Michie's legendary 1961 concept.",
            'proj3-principle': 'A system of matchboxes, each representing a unique game state. The model learns by trial and error (punishments and rewards).',
            'proj3-photodoc-link': 'Photos on Google Drive',
            'proj3-learned': 'Principles of Reinforcement Learning without involving a processor.',
            'proj3-conclusion': 'A fascinating demonstration that machine learning algorithms are based on pure mathematical and logical structure, not digital hardware.',
            'proj4-title': 'Python Mini-Apps',
            'proj4-desc': 'A set of small, functional projects built to understand programming syntax and integrate external services.',
            'proj4-multtable-text': 'Interactive program using the ChatGPT API to create personalized examples and verbal guidance.',
            'proj4-multtable-link': 'GitHub repository',
            'proj4-wordle-text': 'A web remake of the famous word game with a Czech dictionary.',
            'proj4-wordle-link': 'Play the game',
            'proj4-learned': 'OOP in Python, working with JSON and REST APIs, game loops, and state machines.',
            'proj5-title': 'Vibecoding & Sigma',
            'proj5-desc': 'Experiments with rapid development using AI assistants (Google Antigravity) and version control via Git/GitHub.',
            'proj5-sigma-text': 'An interactive web replica of the fictional browser from the horror hacking game Welcome to the Game (WTTG) 3.',
            'proj5-sigma-link': 'Go to Sigma website',
            'proj5-learned': 'Agile prototyping, prompt engineering, resolving version conflicts, deployment via GitHub Pages.',
            'proj5-conclusion': 'AI tools dramatically accelerate turning ideas into functional code — but human oversight of the architecture remains key.',
            'proj6-title': 'Personal Website & Brand',
            'proj6-desc': 'Building an online identity and personal presentation through AI-assisted development (vibe coding).',
            'proj6-site-text': 'Complete personal website vibe-coded with AI tools. Modern design, fully responsive.',
            'proj6-site-link': 'Visit website',
            'proj6-learned': 'Rapid prototyping with AI, hosting management, CSS Grid/Flexbox, and deployment on a custom domain.',
            'proj6-conclusion': 'Vibe coding dramatically shortens the path from idea to working website — the key is defining the intent clearly and reviewing the result.',

            'about-journey-heading': 'My Journey',
            'about-journey-intro': 'I am a student with a strong passion for modern technology, IT, and cybersecurity. I am fascinated by how the digital world connects to real life — from sports telemetry in Formula 1 to the logical foundations of mechanical AI models.',
            'about-achievements-heading': 'Journey & Achievements',
            'timeline1-title': 'Political Competition at NextZone',
            'timeline1-desc': 'Participation and presentation at SSPŠ (Smíchov Secondary Industrial School and Gymnasium).',
            'timeline2-title': 'National Cybersecurity Competition',
            'timeline2-desc': '3rd place in the junior category in Prague. Validation of practical skills in security and cryptography.',
            'timeline3-desc': 'Scored 129 points in the Junior category, confirming advanced algorithmic and logical thinking.',
            'timeline4-title': 'AI dětem (Part-time Job)',
            'timeline4-desc': "Technical support, computer and system administration, and testing innovative AI applications for children's education.",
            'timeline5-title': 'SCIO OSP',
            'timeline5-desc': 'Excellent 2nd place in the General Study Prerequisites (OSP) test in Prague.',
            'timeline6-title': 'Educational Events & Workshops',
            'timeline6-desc': 'Participation in IT events: Minecraft camps, robotics clubs, summer schools, and specialized workshops at SSPŠ and UŠI camp.',
            'timeline7-title': 'Future Factory',
            'timeline7-desc': '1st place in a competition focused on innovation and technological designs of the future.',
            'about-selfstudy-heading': 'Self-Study',
            'study1-desc': 'Completed internationally recognized course focused on the basics of artificial intelligence, algorithms, neural networks, and AI ethics.',
            'study2-title': 'Cybersecurity',
            'study2-desc': 'Custom study plan generated and consulted with ChatGPT. Focus on penetration testing, Linux systems, and network security.',
            'study3-desc': 'Regular viewing of technology and security talks from the renowned congress in Hamburg (39C3).',
            'study3-link': 'Lecture archive →',
            'tag-certificate': 'Certificate',
            'tag-individual': 'Individual',
            'tag-lectures': 'Talks',
            'about-skills-heading': 'Skills',
            'skills-tech-heading': 'Technical',
            'skills-lang-heading': 'Languages',
            'skill-3d': '3D Modeling',
            'skill-soldering': 'Soldering',
            'skill-networking': 'Network Basics',
            'skill-linux': 'Linux Tools',
            'skill-html-basics': 'HTML & CSS (Basics)',
            'skill-english': 'English (B2)',
            'about-interests-heading': 'Interests',
            'interests-intro': 'Outside of technology and coding, I enjoy a wide range of other activities:',
            'interest-f1': '🏎️ Formula 1',
            'interest-climbing': '🧗 Climbing',
            'interest-politics': '🏛️ Politics',
            'interest-sport': '⚽ Sport & Active Life',
            'interest-tech': '🚀 New Technologies',

            'contact-heading': "Let's Connect",
            'contact-intro': "Interested in collaborating on a project, curious about my experiments, or just want to say hi? Feel free to use the form or reach out directly.",
            'contact-direct-heading': 'Direct Contacts',
            'contact-direct-desc': 'Here are my official communication channels. I usually respond within 24 hours.',
            'contact-email-label': 'Send an email',
            'contact-github-label': 'Follow me',
            'contact-blog-label': 'Read my blog',
            'contact-form-heading': 'Send a message',
            'form-name-label': 'Full name',
            'form-name-placeholder': 'John Doe',
            'form-email-label': 'Email address',
            'form-email-placeholder': 'john.doe@email.com',
            'form-message-label': 'Your message',
            'form-message-placeholder': 'Hello, I was interested in your projects...',
            'btn-send': 'Send message →',
            'form-fill-error': 'Please fill in all fields.',
            'form-email-error': 'Please enter a valid email address.',
            'form-sending': 'Sending message...',
            'form-success': "Message sent successfully! I'll get back to you as soon as possible.",
            'form-error-generic': 'Something went wrong. Please try again later.',
            'form-error-network': 'Sending failed due to a network error. Please try again later.',
        }
    };

    let currentLang = localStorage.getItem('lang') || 'cs';
    const langToggle = document.getElementById('lang-toggle');

    function applyLang(lang) {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key] !== undefined) {
                el.textContent = translations[lang][key];
            }
        });
        document.querySelectorAll('[data-placeholder-key]').forEach(el => {
            const key = el.getAttribute('data-placeholder-key');
            if (translations[lang] && translations[lang][key] !== undefined) {
                el.placeholder = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        if (langToggle) langToggle.textContent = lang === 'cs' ? 'EN' : 'CS';
        localStorage.setItem('lang', lang);
        currentLang = lang;
    }

    applyLang(currentLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLang(currentLang === 'cs' ? 'en' : 'cs');
        });
    }

    // -------------------------------------------------------------
    // 3. Mobile Menu Hamburger Toggle
    // -------------------------------------------------------------
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('nav');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // Active page highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath) ||
            (linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // -------------------------------------------------------------
    // 4. Interactive Canvas Particle Background (index.html)
    // -------------------------------------------------------------
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        let mouse = { x: null, y: null, radius: 150 };

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            initParticles();
        };

        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let force = (mouse.radius - distance) / mouse.radius;
                        this.x -= (dx / distance) * force * 3;
                        this.y -= (dy / distance) * force * 3;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = Math.floor((canvas.width * canvas.height) / 11000);
            if (numberOfParticles > 90) numberOfParticles = 90;

            for (let i = 0; i < numberOfParticles; i++) {
                let size = Math.random() * 2 + 1;
                let x = Math.random() * (canvas.width - size * 2) + size;
                let y = Math.random() * (canvas.height - size * 2) + size;
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                const color = 'rgba(128, 128, 128, 0.4)';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connectParticles() {
            let opacityValue = 1;
            const isDark = body.getAttribute('data-theme') === 'dark';
            const lineColor = isDark ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';

            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 110) {
                        opacityValue = 1 - (distance / 110);
                        ctx.strokeStyle = lineColor + opacityValue * 0.15 + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
        }

        resizeCanvas();
        animate();
    }

    // -------------------------------------------------------------
    // 5. Project Filters (portfolio.html)
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.grid .card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');

                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------
    // 6. Contact Form Interactive Validation (contact.html)
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        const inputs = contactForm.querySelectorAll('.form-control');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.parentElement.classList.add('valid');
                } else {
                    input.parentElement.classList.remove('valid');
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const msgInput = document.getElementById('message');

            if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
                showStatus(translations[currentLang]['form-fill-error'], 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showStatus(translations[currentLang]['form-email-error'], 'error');
                return;
            }

            showStatus(translations[currentLang]['form-sending'], 'success');

            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
            }

            const formData = {
                access_key: 'f1d89061-1d77-4fdf-9d6d-fad7bc7cc352',
                subject: 'Nová zpráva z webu oskarvalouch',
                from_name: 'Kontaktní formulář - oskarvalouch',
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                replyto: emailInput.value.trim(),
                message: msgInput.value.trim(),
                botcheck: ''
            };

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(async (response) => {
                let json;
                try {
                    json = await response.json();
                } catch (parseError) {
                    console.error('Failed to parse response:', parseError);
                    showStatus(translations[currentLang]['form-error-generic'], 'error');
                    return;
                }
                if (response.status === 200 && json.success) {
                    showStatus(translations[currentLang]['form-success'], 'success');
                    contactForm.reset();
                    inputs.forEach(input => input.parentElement.classList.remove('valid'));
                } else {
                    showStatus(json.message || translations[currentLang]['form-error-generic'], 'error');
                }
            })
            .catch(error => {
                console.error('Web3Forms network error:', error);
                showStatus(translations[currentLang]['form-error-network'], 'error');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
            });
        });

        function showStatus(message, type) {
            formStatus.textContent = message;
            formStatus.className = 'form-status ' + type;
        }
    }
});
