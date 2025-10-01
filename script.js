// Cloudfloe Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header background on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });

    // Terminal typing animation
    const terminalLines = document.querySelectorAll('.terminal-line');

    function typeWriter(element, text, speed = 50) {
        return new Promise((resolve) => {
            let i = 0;
            element.innerHTML = '';

            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.feature, .problem-item, .audience-card, .step, .tech-item').forEach(el => {
        observer.observe(el);
    });

    // Demo video click handler
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, you'd replace this with actual video
            alert('Demo video would play here! 🎬\n\nFor now, check out the GitHub repo to see Cloudfloe in action.');
        });
    }

    // Copy code block functionality
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        block.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                const originalContent = this.innerHTML;
                this.style.background = '#22c55e';
                this.innerHTML = 'Copied to clipboard! ✓';

                setTimeout(() => {
                    this.style.background = '#1a1a1a';
                    this.innerHTML = originalContent;
                }, 1500);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            });
        });

        // Add cursor pointer and tooltip
        block.style.cursor = 'pointer';
        block.title = 'Click to copy';
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // GitHub stats (mock data - in real implementation you'd fetch from GitHub API)
    function updateGitHubStats() {
        // This would be replaced with actual GitHub API calls
        const mockStats = {
            stars: '1.2k',
            forks: '156',
            issues: '23'
        };

        // Update any GitHub stat elements if they exist
        document.querySelectorAll('[data-github-stat]').forEach(el => {
            const stat = el.dataset.githubStat;
            if (mockStats[stat]) {
                el.textContent = mockStats[stat];
            }
        });
    }

    // Call GitHub stats update
    updateGitHubStats();

    // Add loading states for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = originalText.replace('GitHub', 'Loading...');

            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .feature, .problem-item, .audience-card, .step, .tech-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .btn:active {
        transform: translateY(0) scale(0.98);
    }

    .terminal-line {
        min-height: 1.5em;
    }
`;
document.head.appendChild(style);