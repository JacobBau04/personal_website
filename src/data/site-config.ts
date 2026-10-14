import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://jacobbauman.vercel.app',
    // Headshot: add the image file to src/assets/images/ and import it here (see hero.image below)
    title: 'Jacob Bauman',
    subtitle: 'Robotics MS student, University of Pennsylvania',
    description: 'Portfolio of Jacob Bauman, a Robotics MS student at the University of Pennsylvania.',
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Resume',
            href: '/resume.pdf'
        }
    ],
    footerNavLinks: [
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Resume',
            href: '/resume.pdf'
        }
    ],
    socialLinks: [
        {
            text: 'Email',
            href: 'mailto:jacob.bau04@gmail.com'
        },
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/jacob--bauman/'
        },
        {
            text: 'GitHub',
            href: 'https://github.com/JacobBau04'
        }
    ],
    hero: {
        // TODO: 2-3 sentences on your focus areas (written in Markdown; **bold** works)
        text: "I'm **Jacob Bauman**, a Robotics MS student at the University of Pennsylvania.",
        actions: [
            {
                text: 'View Projects',
                href: '/projects'
            },
            {
                text: 'Resume',
                href: '/resume.pdf'
            }
        ]
    },
    lookingFor: {
        title: "What I'm Looking For",
        // TODO: the roles, start date, and areas you are targeting
        text: ''
    },
    subscribe: {
        enabled: false
    },
    postsPerPage: 8,
    projectsPerPage: 12
};

export default siteConfig;