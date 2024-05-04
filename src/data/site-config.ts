export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
    target?: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Giles',
    subtitle: 'Founder | Father | Producer | dj',
    description: 'Giles is a music producer, dj, startup founder, and father. He builds products at the intersection of music, technology and design.',
    image: {
        src: '/gb.avif',
        alt: 'Giles - Founder | Father | Producer | dj'
    },
    headerNavLinks: [
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Changelog',
            href: '/changelog'
        },
        {
            text: 'Music',
            href: 'https://soundcloud.com/gilo_music',
            target: '_blank'
        }
    ],
    footerNavLinks: [
        {
            text: 'Contact',
            href: '/contact'
        }
    ],
    socialLinks: [
        {
            text: 'SoundCloud',
            href: 'https://soundcloud.com/gilo_music'
        },
        {
            text: 'X/Twitter',
            href: 'https://twitter.com/gilesbutler'
        }
    ],
    hero: {
        title: 'I\'m Giles. A creative technologist, music producer, dj and father.',
        text: `<p>Blending technology with the arts is more than a pursuit — it's a lifestyle. Guided by intuition and curated research, I channel creativity into everyday innovation. I’m deeply immersed in the art of breaking new ground with tech, crafting design that pops, and pushing the envelope of artistic growth. My projects dance at the vibrant intersection of music, technology, and design — each one a unique narrative woven from sound and pixels. I'm always on the lookout for collaborations here in Sydney or online. If you’re into making big, bold, artistic ripples or just want to peek into my world, explore my projects below and let’s connect!</p>
        <p>Currently attempting to release a new product every month till 2025.</p>
        `,
        image: {
            src: '/gb.avif',
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        title: 'Subscribe to my Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
