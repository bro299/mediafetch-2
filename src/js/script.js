
// Paste function
document.getElementById('pasteBtn').addEventListener('click', () => {
    navigator.clipboard.readText().then(text => {
        document.getElementById('urlInput').value = text;
    }).catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
});

// Fetch data function (placeholder)
async function fetchData() {
    const urlInput = document.getElementById('urlInput').value.trim();
const content = document.getElementById('content');
const spinner = document.getElementById('spinner');

    content.innerHTML = '';
    spinner.style.display = 'block';

    if (!urlInput) {
        content.innerHTML = '<p class="text-danger">Silakan masukkan URL yang valid.</p>';
        spinner.style.display = 'none'; // Hide spinner
        return;}
        content.innerHTML = ''; // Clear previous content

        if (!urlInput) {
            content.innerHTML = '<p class="text-red-500 font-semibold">Please enter a valid URL.</p>';
            return;
            }
    

            let apiUrl;
if (urlInput.includes('tiktok.com')) {
apiUrl = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(urlInput)}`;
} else if (urlInput.includes('spotify.com')) {
apiUrl = `https://itzpire.com/download/spotify?url=${encodeURIComponent(urlInput)}`;
} else if (urlInput.includes('instagram.com')) {
if (urlInput.includes('/reel/') || urlInput.includes('/p/')) {
    apiUrl = `https://api.nyxs.pw/dl/ig?url=${encodeURIComponent(urlInput)}`;
} else {
    content.innerHTML = '<p class="text-red-500 font-semibold">Invalid Instagram URL. Please enter a valid Instagram reel or post URL.</p>';
    return;
}
} else if (urlInput.includes('facebook.com')) {
    if (urlInput.includes('/reel/')) {
        apiUrl = `https://apis.ryzendesu.vip/api/downloader/fbdl?url=${encodeURIComponent(urlInput)}`;
    } else {
        apiUrl = `https://apis.ryzendesu.vip/api/downloader/fbdl?url=${encodeURIComponent(urlInput)}`;
    }
} else if (urlInput.includes('twitter.com') || urlInput.includes('x.com')) {
    apiUrl = `https://itzpire.com/download/twitter?url=${encodeURIComponent(urlInput)}`;
    } else {
    content.innerHTML = '<p class="text-red-500 font-semibold">Invalid URL. Please enter a TikTok, Spotify, Instagram, Facebook, or Twitter URL.</p>';
    return;
    }

try {
const response = await fetch(apiUrl);
const data = await response.json();

// Fetch Data Tiktok
if (urlInput.includes('tiktok.com')) {
    if (data.id) {
        const { title, created_at, stats, video, music, author, images } = data;
        content.innerHTML = `
            <div class="card mb-4">
                <div class="card-custom">
                    <img src="${author.avatar}" alt="Author Avatar" class="small-avatar rounded-circle mr-3 responsive-img">
                    <span class="font-bold">${author.name} (@${author.unique_id})</span>
                </div>
                <div class="mb-4">
                    <p class="font-semibold text-lg">${title}</p>
                    <p class="text-sm text-gray-500">Created on: ${created_at}</p>
                </div>
                <div id="media-content"></div>
                <div class="flex justify-between text-center mb-4">
                    <div>
                        <span>👍</span><br>
                        ${stats.likeCount} Likes
                    </div>
                    <div>
                        <span>💬</span><br>
                        ${stats.commentCount} Comments
                    </div>
                    <div>
                        <span>🔗</span><br>
                        ${stats.shareCount} Shares
                    </div>
                    <div>
                        <span>🎧</span><br>
                        ${stats.playCount} Plays
                    </div>
                </div>
                <div class="text-center">
                    ${video ? `<a href="${video.noWatermark}" download class="btn btn-primary-custom">Download Video</a> |` : ''}
                    ${music ? `<a href="${music.play_url}" download class="btn btn-primary-custom">Download Music</a>` : ''}
                </div>
            </div>
        `;

        const mediaContent = document.getElementById('media-content');
        if (images && images.length > 0) {
            images.forEach((image, index) => {
                const imageElement = document.createElement('div');
                imageElement.className = 'mb-4';
                imageElement.innerHTML = `
                    <img src="${image.url}" alt="TikTok Image ${index + 1}" class="responsive-img rounded-lg mb-2">
                    <a href="${image.url}" download class="btn btn-primary-custom">Download Image ${index + 1}</a>
                `;
                mediaContent.appendChild(imageElement);
            });
        } else if (video) {
            mediaContent.innerHTML = `
                <div class="mb-4">
                    <video controls src="${video.noWatermark}" class="responsive-video rounded-lg"></video>
                </div>
            `;
        }
    } else {
        content.innerHTML = '<p class="text-red-500 font-semibold">Failed to fetch TikTok data.</p>';
    }
}
// Fetch Data Spotify
else if (urlInput.includes('spotify.com')) {
    if (data.status === 'success') {
        const { title, artist, image, download } = data.data;
        content.innerHTML = `
            <div class="card mb-4">
                <img src="${image}" alt="Song Image" class="responsive-img rounded-lg mb-2">
                <p class="font-semibold text-lg">${title}</p>
                <p class="text-sm text-gray-500">Artist: ${artist}</p>
                <div class="text-center">
                    <a href="${download}" download class="btn btn-primary-custom">Download Music</a>
                </div>
            </div>
        `;
    } else {
        content.innerHTML = '<p class="text-red-500 font-semibold">Failed to fetch Spotify data.</p>';
    }
}
// Fetch data Instagram
else if (urlInput.includes('instagram.com')) {
    if (data.result) {
        const { result } = data;
        if (urlInput.includes('/reel/')) {
            if (result.length > 0) {
                const reel = result[0];
                content.innerHTML = `
                    <video controls src="${reel.url}" class="responsive-video rounded-lg"></video>
                    <div class="text-center mt-4">
                        <a href="${reel.url}" download class="btn btn-primary-custom">Download Reel</a>
                    </div>
                `;
            } else {
                content.innerHTML = '<p class="text-red-500">No reels found.</p>';
            }
        } else if (urlInput.includes('/p/')) {
            if (result.length > 0) {
                result.forEach(image => {
                    content.innerHTML += `
                        <img src="${image.url}" alt="Instagram Post Image" class="responsive-img rounded-lg mb-4">
                        <div class="text-center">
                            <a href="${image.url}" download class="btn btn-primary-custom">Download Image</a>
                        </div>
                    `;
                });
            } else {
                content.innerHTML = '<p class="text-red-500">No images found.</p>';
            }
        }
    } else {
        content.innerHTML = '<p class="text-red-500 font-semibold">Failed to fetch Instagram data.</p>';
    }
}
// Fetch Data Facebook
else if (urlInput.includes('facebook.com')) {
    if (urlInput.includes('/reel/')) {
        // Handle Facebook Reel
        if (data.sd && data.hd) {
            const { sd, hd, thumbnail } = data;
            content.innerHTML = `
                <div class="card mb-4">
                    <img src="${thumbnail}" alt="Thumbnail" class="responsive-img rounded-lg mb-2">
                    <video controls src="${hd}" class="responsive-video rounded-lg mb-2"></video>
                    <div class="text-center">
                        <a href="${hd}" download class="btn btn-primary-custom">Download HD Video</a> | 
                        <a href="${sd}" download class="btn btn-primary-custom">Download SD Video</a>
                    </div>
                </div>
            `;
        } else {
            content.innerHTML = '<p class="text-red-500 font-semibold">Failed to fetch Facebook reel data.</p>';
        }
    } else {
        // Handle Facebook standard content
        if (data.sd && data.hd) {
            const { sd, hd, thumbnail } = data;
            content.innerHTML = `
                <div class="card mb-4">
                    <img src="${thumbnail}" alt="Thumbnail" class="responsive-img rounded-lg mb-2">
                    <video controls src="${hd}" class="responsive-video rounded-lg mb-2"></video>
                    <div class="text-center">
                        <a href="${hd}" download class="btn btn-primary-custom">Download HD Video</a> | 
                        <a href="${sd}" download class="btn btn-primary-custom">Download SD Video</a>
                    </div>
                </div>
            `;
        } else {
            content.innerHTML = '<p class="text-red-500 font-semibold">Failed to fetch Facebook data.</p>';
        }
    }
}

// Fetch Data Twitter
else if (urlInput.includes('twitter.com') || urlInput.includes('x.com')) {
    if (data.status === 'success') {
        const { desc, thumb, video_sd, video_hd, audio } = data.data;
        content.innerHTML = `
            <div class="card mb-4">
                <img src="${thumb}" alt="Thumbnail" class="responsive-img rounded-lg mb-2">
                <p class="font-semibold text-lg">${desc}</p>
                <div class="text-center mt-4">
                    ${video_hd ? `<a href="${video_hd}" download class="btn btn-primary-custom">Download HD Video</a> |` : ''}
                    ${video_sd ? `<a href="${video_sd}" download class="btn btn-primary-custom">Download SD Video</a> |` : ''}
                    ${audio ? `<a href="${audio}" download class="btn btn-primary-custom">Download Audio</a>` : ''}
                </div>
            </div>
        `;
    } else {
        content.innerHTML = '<p class="text-red-500 font-semibold">Failed to fetch Twitter data.</p>';
    }
}
} catch (error) {
console.error(error);
content.innerHTML = '<p class="text-red-500 font-semibold">An error occurred while fetching data.</p>';
}
finally {
        spinner.style.display = 'none'; // Hide spinner
    }
}

////////////////////////////////////////////
// Dark mode toggle
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = toggleButton.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Language translation
const translations = {
    id: {
        "home": "Beranda",
        "about": "Tentang",
        "contact": "Kontak",
        "api": "API",
        "hero-title": "Unduh Video, Musik & Gambar dengan Mudah",
        "hero-subtitle": "Masukkan URL di bawah ini untuk memulai!",
        "url-placeholder": "Masukkan URL di sini...",
        "download-btn": "Fetch",
        "loading": "Memuat...",
        "about-title": "Tentang Kami",
        "about-text-1": "MediaFetch adalah platform unduhan media yang mudah digunakan dan gratis. Kami menyediakan layanan untuk mengunduh video, musik, dan gambar dari berbagai platform media sosial populer.",
        "about-text-2": "Misi kami adalah membuat proses unduhan konten digital menjadi sesederhana dan seefisien mungkin bagi pengguna kami.",
        "contact-title": "Hubungi Kami",
        "email": "Email",
        "phone": "Telepon",
        "address": "Alamat",
        "address-text": "Purworejo, Jawa Tengah, Indonesia",
        "footer-text": "© 2024 MediaFetch. Hak cipta dilindungi undang-undang."
    },
    en: {
        "home": "Home",
        "about": "About",
        "contact": "Contact",
        "api": "API",
        "hero-title": "Download Videos, Music & Images Easily",
        "hero-subtitle": "Enter the URL below to get started!",
        "url-placeholder": "Enter URL here...",
        "download-btn": "Fetch",
        "loading": "Loading...",
        "about-title": "About Us",
        "about-text-1": "MediaFetch is an easy-to-use and free media download platform. We provide services to download videos, music, and images from various popular social media platforms.",
        "about-text-2": "Our mission is to make the process of downloading digital content as simple and efficient as possible for our users.",
        "contact-title": "Contact Us",
        "email": "Email",
        "phone": "Phone",
        "address": "Address",
        "address-text": "Purworejo, Jawa Tengah, Indonesia",
        "footer-text": "© 2024 MediaFetch. All rights reserved."
    },
    jv: {
        "home": "Ngomah",
        "about": "Babagan",
        "contact": "Kontak",
        "api": "API",
        "hero-title": "Download Video, Musik & Gambar Kanthi Gampang",
        "hero-subtitle": "Lebokno URL ing ngisor iki kanggo miwiti!",
        "url-placeholder": "Lebokno URL ing kene...",
        "download-btn": "Fetch",
        "loading": "Ngamot...",
        "about-title": "Babagan Kita",
        "about-text-1": "MediaFetch iku platform download media sing gampang digunakake lan gratis. Kita nyediakake layanan kanggo download video, musik, lan gambar saka maneka warna platform media sosial sing populer.",
        "about-text-2": "Misi kita yaiku nggawe proses download konten digital dadi sederhana lan efisien kanggo pengguna kita.",
        "contact-title": "Hubungi Kita",
        "email": "Email",
        "phone": "Telpon",
        "address": "Alamat",
        "address-text": "Purworejo, Jawa Tengah, Indonesia",
        "footer-text": "© 2024 MediaFetch. Kabeh hak dilindhungi undang-undang."
    }
};

function changeLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(elem => {
        const key = elem.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            elem.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-lang-placeholder]').forEach(elem => {
        const key = elem.getAttribute('data-lang-placeholder');
        if (translations[lang] && translations[lang][key]) {
            elem.placeholder = translations[lang][key];
        }
    });
}
document.getElementById('languageSelect').addEventListener('change', function() {
    changeLanguage(this.value);
});

// Initial language set
changeLanguage('en');


// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Animate on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight - 50) {
                    element.classList.add('show');
                }
            });
        }

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
    


