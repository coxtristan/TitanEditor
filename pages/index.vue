<template>
    <div>
        <section class="hero-container ma-auto">
            <header class="hero-text">
                <div>
                    <h1 class="hero-name">Tristan Cox</h1>
                    <h2 class="hero-description">
                        Fullstack Developer
                    </h2>
                    <div class="hero-link-container">
                        <a class="external-link" href="https://github.com" target="_blank">
                            <VIcon class="pa-0 ma-0 link-icon">mdi-github</VIcon>
                            <span style="text-align: left; margin-left: 0px">github</span>
                        </a>
                        <a class="external-link" href="https://tristanshostedfiles.s3.amazonaws.com/TristanCoxResume.pdf" download="" target="_blank">
                            <VIcon class="pa-0 ma-0 link-icon">mdi-download</VIcon>
                            resume
                        </a>
                    </div>
                </div>
            </header>
        </section>

        <section v-for="project in projects" :key="project.id" class="pf-item-container ma-auto ">
            <header class="pf-header">
                <h1 class="pf-item-header">{{ project.title }}</h1>

                <p class="pf-item-desc ">{{ project.description }}</p>
                <p class="pf-item-tech ">{{ project.tech.map(x => x.name).join(', ')}}</p>
                <div class="pf-link-container">
                    <a :href="project.github" class="pf-item-git">View Code</a>
                    <a v-if="project.projectLink" :href="project.projectLink" class="pf-item-git">Try it (Desktop PC
                        only)</a>
                </div>
            </header>
            <img :src="project.screenshot" class="pf-item-img elevation-4"/>
        </section>
        <section class="pf-contact-container mx-auto pb-4">
            <header>
                <h1 class="pf-item-header">Contact Me!</h1>
                <p class="pf-item-desc pb-4">I'm always looking for work, so if you like what you see, get in contact!</p>
            </header>
            <ContactForm/>
        </section>
    </div>
</template>

<script>
import 'particles.js'
import {debounce} from 'lodash'
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import ContactForm from "~/components/contactform";

export default {
    layout: 'portfolio',
    components: {
        ContactForm
    },

    data() {

        return {

            contactInfo: {
                name: 'Tristan Cox',
                job: 'Fullstack Developer',
                github: 'https://github.com/coxtristan',
                email: 'cox.tristan.tc@gmail.com',
                discord: '@Mystic#9217',
                avatar:
                    'https://avatars.githubusercontent.com/u/17211039?s=400&u=3e7453d910f4015cc90ea5b372302944f70673ab&v=4'
            },

            projects: [
                {
                    title: 'Game Overlay',
                    github: 'https://github.com/coxtristan/COD7-Tools',

                    description: 'High performance graphics overlay made by developers, for developers.',
                    tech: [
                        {
                            name: 'C++',
                            icon: 'mdi-language-cpp'
                        },
                        {
                            name: 'x64dbg',
                            icon: 'mdi-spider'
                        },
                        {
                            name: 'Capstone Disassembly Engine',
                            icon: 'mdi-hexadecimal'
                        }
                    ],
                    screenshot: require('@/screenshots/overlayss1.png'),
                    id: 0
                },
                {
                    title: 'Anomaly',
                    github: 'https://github.com/coxtristan/TitanEditor',
                    projectLink: 'https://lunaranomaly.com/designer',
                    description: 'A web based canvas editor made for Black Ops 3 modding.',
                    tech: [
                        {
                            name: 'Amazon AWS',
                            icon: 'mdi-aws'
                        },
                        {
                            name: 'KonvaJS',
                            icon: 'mdi-brush'
                        },
                        {
                            name: 'Lua',
                            icon: 'mdi-language-lua'
                        },
                        {
                            name: 'NodeJS',
                            icon: 'mdi-nodejs'
                        },
                        {
                            name: 'NuxtJS',
                            icon: 'mdi-nuxt'
                        },
                        {
                            name: 'VueJS',
                            icon: 'mdi-vuejs'
                        },
                        {
                            name: 'Vuetify',
                            icon: 'mdi-vuetify'
                        }
                    ],

                    screenshot: require('@/screenshots/anomalyss1.png'),
                    id: 1
                },
                {
                    title: 'Commission Tracker',
                    github: 'https://github.com/coxtristan/CommsApp',
                    description: 'Android app specially made for freelance artists.',
                    tech: [{
                        name: 'Nativescript-Vue',
                        icon: 'mdi-nativescript'
                    }],
                    screenshot: require('@/screenshots/phoness1.png'),
                    id: 2
                },
            ]
            // #endregion
        }
    },

    methods: {
        handleSubmit(e) {

            console.log(e);
        }
    },


    mounted() {
    }
}
</script>

<style lang="scss" scoped>

.hero-container {
    display: flex;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    width: 75%;
    height: 100vh;
}

.pf-item-container {
    display: flex;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    width: 90%;
    height: 100vh;
    max-height: 100vh;
}

.pf-item-header {
    font-size: 5vw;

    font-family: Roboto, 'sans-serif';
    font-style: normal;
    font-weight: normal;
    //line-height: 1;
    //white-space: nowrap;
    text-align: left;
    color: $primary;
}

.pf-link-container {
    display: flex;
    max-height: 100vh;
}


.pf-item-desc {
    font-size: 1vw;
    font-family: Roboto, 'sans-serif';
    font-style: normal;
    font-weight: normal;
    line-height: 0.9;
    //white-space: nowrap;
    text-align: left;
    margin: 2rem 0 0 0;
    padding: 0;
}

.pf-item-tech {
    font-family: "JetBrains Mono", monospace;
    color: $highlight;
    text-align: left;
    margin: 1rem 0 0 0;
    padding: 0;
    font-size: 1vw;

}

.pf-item-git {
    display: block;
    font-family: "JetBrains Mono", monospace;
    color: $highlight;
    text-align: left;
    margin: 1rem 1rem 0 0;
    padding: 0;
    font-size: 1vw;
}

.pf-item-img {
    width: auto;
    height: auto;
    margin-left: 5%;
    max-height: 90vh;
    max-width: 50%;
}


.hero-text {

    font-size: 8vw;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    color: #408CFF;


}

.hero-name {
    font-size: 10vw;
    font-family: Roboto, 'sans-serif';
    font-style: normal;
    font-weight: normal;
    line-height: 0.9;
}

.hero-description {
    color: #FFFFFF;
    font-family: Roboto, "sans-serif";
    font-size: 5vw;
    font-style: normal;
    font-weight: normal;
    text-align: center;
    text-transform: capitalize;
    width: 100%;
}


.hero-link-container {
    display: flex;
    justify-content: space-around;


}


.external-link {
    font-family: JetBrains Mono, monospace;
    font-style: normal;
    font-weight: normal;
    font-size: 3vw;
    line-height: 45px;
    text-decoration: none;
    color: #3EFF3A !important;
    margin: 0px;
    padding: 0px;
    padding-right: 0px;

}

.link-icon {
    font-size: 3vw;
}

.pfp-big-circle {
    height: 512px;
}

.pfp-big-img {
    width: 512px;
    height: 512px;
}

.pf-header {
    max-width: 50%;
    width: 50%;
}

.pf-contact-container {
    display: flex;
    justify-content: space-between;
    width: 90%;
    height: 80vh;
    padding-top: 5%;
}

@media only screen and (max-width: 768px) {
    .pf-item-container {
        flex-direction: column;
    }

    .pf-item-img{
        max-width: 100%;
    }

    .pf-contact-container{
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        form{
            width: 100%;
        }
    }

    .pf-header {
        max-width: 90%;
        width: 90%;
    }

    .pf-item-header{
        font-size: 6vh;
    }

    .pf-item-desc{
        font-size: 2vh;
        padding: 0;
        margin: 0;
    }

    .pf-item-tech{
        font-size: 2vh;
    }

    .pf-item-git{
        font-size: 2vh;
    }


    .pf-item-img {
        width: 90%;
        height: auto;
        margin: 0;
    }

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {


}


// media queries

</style>
