import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://jacobbauman.vercel.app',
    avatar: {
        src: avatar,
        alt: 'Jacob Bauman'
    },
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
    footerNavLinks: [],
    socialLinks: [
        {
            text: 'GitHub',
            href: 'https://github.com/JacobBau04'
        }
    ],
    hero: {
        text: "I'm **Jacob Bauman**, a Robotics MS student at the University of Pennsylvania.",
        image: {
            src: hero,
            alt: 'Placeholder image'
        },
        actions: [
            {
                text: 'View Projects',
                href: '/projects'
            }
        ]
    },
    subscribe: {
        enabled: false
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
