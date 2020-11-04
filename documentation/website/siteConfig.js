/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
// const users = [
//   {
//     caption: 'User1',
//     // You will need to prepend the image path with your baseUrl
//     // if it is not '/', like: '/test-site/img/image.jpg'.
//     image: '/img/e-transparent-disque-blanc.svg',
//     infoLink: '/',
//     pinned: true,
//   },
// ];

const siteConfig = {
    title: 'API GREEN NODE', // Title for your website.
    tagline: 'Our ease-to-use Node Sdk for API Green',
    url: 'https://github.com/PayGreen', // Your website URL
    baseUrl: '/api-green-node/', // Base URL for your project */
    // For github.io type URLs, you would set the url and baseUrl like:
    //   url: 'https://facebook.github.io',
    //   baseUrl: '/test-site/',

    // Used for publishing and more
    projectName: 'api-green-node',
    organizationName: 'PayGreen',
    // For top-level user or org sites, the organization is still the same.
    // e.g., for the https://JoelMarcey.github.io site, it would be set like...
    //   organizationName: 'JoelMarcey'

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks: [
        { page: '#try', label: 'Getting Started' },
        { doc: 'start-sdk', label: 'Docs' },
        { href: 'https://github.com/PayGreen/api-green-node', label: 'Github' },
        // {blog: true, label: 'Blog'},
    ],

    // // If you have users set above, you add it here:
    // users,

    /* path to images for header/footer */
    headerIcon: 'img/e-transparent-disque-blanc.ico',
    // footerIcon: 'img/e-transparent-disque-blanc.ico',
    favicon: 'img/e-transparent-disque-vert.ico',

    /* Colors for website */
    colors: {
        primaryColor: '#33AD73',
        secondaryColor: '#77D1A6',
    },

    /* Custom fonts for website */

    fonts: {
        myFont: ['Open Sans', 'sans-serif'],
        myOtherFont: ['Open Sans', 'sans-serif'],
    },
    stylesheets: [
        'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
        'https://buttons.github.io/buttons.js',
    ],

    // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
    copyright: `Copyright © ${new Date().getFullYear()} Paygreen`,

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: 'default',
    },

    // Add custom scripts here that would be placed in <script> tags.
    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
        '/js/code-block-buttons.js',
    ],

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    // No .html extensions for paths.
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/undraw_online.svg',
    twitterImage: 'img/undraw_tweetstorm.svg',

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: 'monokai-sublime',
        defaultLang: 'javascript',
    },

    usePrism: ['js'],

    // For sites with a sizable amount of content, set collapsible to true.
    // Expand/collapse the links and subcategories under categories.
    // docsSideNavCollapsible: true,

    // Show documentation's last contributor's name.
    // enableUpdateBy: true,

    // Show documentation's last update time.
    // enableUpdateTime: true,

    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...
    repoUrl: 'https://github.com/PayGreen/api-green-node',
};

module.exports = siteConfig;