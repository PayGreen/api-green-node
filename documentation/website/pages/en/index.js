/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
    render() {
        const { siteConfig, language = '' } = this.props;
        const { baseUrl, docsUrl } = siteConfig;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        const langPart = `${language ? `${language}/` : ''}`;
        const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

        const SplashContainer = (props) => (
            <div className="homeContainer">
                <div className="homeSplashFade">
                    <div className="wrapper homeWrapper">{props.children}</div>
                </div>
            </div>
        );

        const Logo = (props) => (
            <div className="projectLogo">
                <img src={props.img_src} alt="Project Logo" />
            </div>
        );

        const ProjectTitle = (props) => (
            <h2 className="projectTitle">
                {props.title}
                <small>{props.tagline}</small>
            </h2>
        );

        const PromoSection = (props) => (
            <div className="section promoSection">
                <div className="promoRow">
                    <div className="pluginRowBlock">{props.children}</div>
                </div>
            </div>
        );

        const Button = (props) => (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={props.href} target={props.target}>
                    {props.children}
                </a>
            </div>
        );

        return (
            <SplashContainer>
                <Logo img_src={`${baseUrl}img/illu-product-tree-ux.svg`} />
                <div className="inner">
                    <ProjectTitle
                        tagline={siteConfig.tagline}
                        title={siteConfig.title}
                    />
                    <PromoSection>
                        <Button href="#try">Get Started</Button>
                        <Button href={docUrl('start-sdk.html')}>Learn Basics</Button>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

class Index extends React.Component {
    render() {
        const { config: siteConfig, language = '' } = this.props;
        const { baseUrl } = siteConfig;

        const Block = (props) => (
            <Container
                padding={['bottom', 'top']}
                id={props.id}
                background={props.background}
            >
                <GridBlock
                    align="center"
                    contents={props.children}
                    layout={props.layout}
                />
            </Container>
        );

        const BlockCode = (props) => (
            <Container id={props.id} background={props.background}>
                <GridBlock
                    align="left"
                    contents={props.children}
                    layout={props.layout}
                />
            </Container>
        );

        const TryOut = () => (
            <BlockCode id="try" background="light" gridBlockAlign="left">
                {[
                    {
                        content:
                            'Our sdk is hosted on NPM, so you can simply use : \n' +
                            '```\n' +
                            'npm install api-green-node\n' +
                            '```\n',
                        title: 'Get Started',
                    },
                ]}
            </BlockCode>
        );

        const Github = () => (
            <BlockCode gridBlockAlign="left">
                {[
                    {
                        content:
                            "You can check our repository [`here`](github.com/api-green-node). Don't hesitate to contact tech@paygreen.fr (or create an [`Issue`](github.com/api-green-node/issues) on github) for any questions. </br>For more information about API Green, please visit http://172.40.1.1/documentation/green.",
                        title: 'Github Repository',
                    },
                ]}
            </BlockCode>
        );

        const Features = (props) => (
            <Block layout="fourColumn" background={props.background}>
                {[
                    {
                        content:
                            'Simple methods that support all API Green endpoints.',
                        image: `${baseUrl}img/leaf.svg`,
                        imageAlign: 'top',
                        title: 'Easy API Calls',
                    },
                    {
                        content:
                            'Quickly and safely generate data for post/put calls.',
                        image: `${baseUrl}img/leaf.svg`,
                        imageAlign: 'top',
                        title: 'Data Building Models',
                    },
                    {
                        content: 'Handle and convert data received from API.',
                        image: `${baseUrl}img/leaf.svg`,
                        imageAlign: 'top',
                        title: 'Extra Tools',
                    },
                ]}
            </Block>
        );

        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language} />
                <div className="mainContainer">
                    <div className="featuresBlock">
                        <Features />
                    </div>
                    <TryOut />
                    <Github />
                    {/* <Showcase /> */}
                </div>
            </div>
        );
    }
}

module.exports = Index;