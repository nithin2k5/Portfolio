export const profile = {
    name: 'Nithin Kumar K',
    role: 'Full-Stack Developer',
    tagline: 'Engineering robust solutions across Web, Mobile, Desktop and Computer Vision.',
    avatar: 'https://github.com/nithin2k5.png?size=352',
    github: 'https://github.com/nithin2k5',
    githubUser: 'nithin2k5',
    linkedin: 'https://linkedin.com',
    email: 'ntbm8125@gmail.com',
    resume: '/2300031401_nithin.pdf',
    timezone: 'Asia/Kolkata',
    timezoneLabel: 'India time',
};

export const experience = [
    {
        period: 'May 2025 – Jul 2025',
        company: 'Infac India Pvt Ltd',
        role: 'Computer Vision Engineer Intern',
        description:
            'Built a safety system using MediaPipe and OpenCV for hydraulic press operations, focused on real-time video processing and bounding box detection.',
    },
];

export const awards = [
    {
        rank: '1st Place',
        icon: 'trophy',
        title: 'Research Conclave 2026',
        org: 'VR Siddhartha Engineering College',
        year: '2026',
    },
    {
        rank: 'Domain Winners',
        icon: 'trophy',
        title: 'Nxtgen Hackathon',
        org: 'SRM University',
        year: '2026',
    },
    {
        rank: '2nd Place',
        icon: 'award',
        title: 'Research Conclave 2025',
        org: 'VR Siddhartha Engineering College',
        year: '2025',
    },
    {
        rank: 'Finalist',
        icon: 'star',
        title: 'BITS Hackathon',
        org: 'National Level, BITS Pilani Hyderabad',
        year: '2024',
    },
    {
        rank: '2nd Place',
        icon: 'award',
        title: 'CodeForCause',
        org: 'Built a social impact platform connecting volunteers with local NGOs.',
        year: '2023',
    },
];

// Optional `images`: add screenshot paths (in /public) to replace the generated mockups
export const projects = [
    {
        title: 'Sahaay',
        category: 'Mobile',
        tags: ['Healthcare', 'Mobile', 'Expo'],
        summary: 'Healthcare assistance on your phone.',
        description:
            'A React Native/Expo application for healthcare assistance, featuring guided flows and accessibility tools.',
        tech: ['React Native', 'Expo', 'Node.js'],
        link: 'https://github.com/dinexh/Sahaay-expo',
        color: '#10B981',
        stats: [
            { value: 'Expo', label: 'cross-platform build' },
            { value: 'A11y', label: 'accessibility tools built in' },
            { value: 'Node', label: 'API backend' },
        ],
    },
    {
        title: 'Swasthya',
        category: 'Mobile',
        tags: ['Health', 'Mobile', 'Data viz'],
        summary: 'Health and wellness tracking.',
        description:
            'A mobile application focused on health and wellness tracking, with custom data visualization.',
        tech: ['React Native', 'TypeScript', 'REST API'],
        link: 'https://github.com/nithin2k5/swasthya-app',
        color: '#6366F1',
        stats: [
            { value: 'TS', label: 'fully typed codebase' },
            { value: 'Charts', label: 'custom data visualization' },
            { value: '2', label: 'platforms, one codebase' },
        ],
    },
    {
        title: 'NebulaML',
        category: 'Computer Vision',
        tags: ['AI', 'YOLO', 'Tooling'],
        summary: 'YOLO dataset generator.',
        description:
            'A YOLO data generator for computer vision datasets that streamlines annotation and augmentation.',
        tech: ['Python', 'YOLO', 'OpenCV'],
        link: 'https://github.com/nithin2k5/yoloGenerator',
        color: '#F59E0B',
        detections: [
            { label: 'person', score: 0.94, box: [12, 18, 30, 64] },
            { label: 'helmet', score: 0.88, box: [16, 12, 14, 16] },
            { label: 'forklift', score: 0.91, box: [52, 34, 38, 50] },
        ],
        stats: [
            { value: 'YOLO', label: 'ready-to-train output' },
            { value: 'Auto', label: 'augmentation pipeline' },
            { value: 'Py', label: 'OpenCV powered' },
        ],
    },
    {
        title: 'Conduit Detector',
        category: 'Computer Vision',
        tags: ['AI', 'Detection', 'Industrial'],
        summary: 'Detects conduits in real environments.',
        description:
            'A computer vision application that detects and analyzes conduits in various environments.',
        tech: ['Python', 'OpenCV', 'Machine Learning'],
        link: 'https://github.com/nithin2k5/infac-p3',
        color: '#EF4444',
        detections: [
            { label: 'conduit', score: 0.93, box: [8, 30, 52, 18] },
            { label: 'conduit', score: 0.87, box: [58, 14, 16, 70] },
            { label: 'joint', score: 0.81, box: [54, 26, 22, 22] },
        ],
        stats: [
            { value: 'CV', label: 'detection and analysis' },
            { value: 'ML', label: 'trained models' },
            { value: 'Real-time', label: 'video analysis' },
        ],
    },
];

export const tools = [
    { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML5', 'CSS3'] },
    { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
    { group: 'Mobile', items: ['React Native', 'Expo'] },
    { group: 'Backend & Data', items: ['Node.js', 'Express', 'MySQL', 'PostgreSQL'] },
    { group: 'Computer Vision', items: ['OpenCV', 'MediaPipe', 'YOLO'] },
    { group: 'DevOps & Tools', items: ['Git', 'GitHub', 'Nginx', 'Vercel'] },
];
