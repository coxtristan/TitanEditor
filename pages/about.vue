<template>
    <div style="background-color: transparent">
        <div id="particles-js"></div>
        <div class="text">
            <v-container fluid style="height: 100vh" class="ma-0 pa-0">
                <v-spacer></v-spacer>
                <v-row
                    no-gutters
                    justify="center"
                    align="center"
                    style="height: 100vh"
                >
                    <v-col align="center">
                        <v-avatar>
                            <v-img :src="contactInfo.avatar"></v-img>
                        </v-avatar>
                        <h1>{{ contactInfo.name }}</h1>
                        <p>{{ splashText }}</p>
                        <v-container style="width: max-content">
                            <v-row class="mb-4 pa-auto" align="center" justify="start">
                                <v-icon>mdi-github</v-icon>
                                <a class="blue--text elevation-3" :href="contactInfo.github" target="_blank">{{
                                    contactInfo.github
                                }}</a>
                                

                            </v-row>
                            <v-row class="mb-4 pa-auto" align="center" justify="start">
                                <v-icon>mdi-gmail</v-icon>
                                <a class="blue--text elevation-3" :href="'mailto:' + contactInfo.email" target="_blank">{{
                                    contactInfo.email
                                }}</a>
                            </v-row>

                            <v-row class="mb-4 pa-auto" align="center" justify="start">
                                <v-icon>mdi-discord</v-icon>
                                <span class="blue--text elevation-3 pl-2" :href="contactInfo.discord">{{
                                    contactInfo.discord
                                }}</span>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import 'particles.js'
export default {
    data() {
        return {
            splashTextFull:
                'Passionate developer specializing in game dev utilities',
            splashText: '',
            splashTextIndex: 0,
            typer: {},

            // personal info
            contactInfo: {
                name: 'Tristan Cox',
                github: 'https://github.com/coxtristan',
                email: 'cox.tristan.tc@gmail.com',
                discord: '@Mystic#9217',
                avatar:
                    'https://avatars.githubusercontent.com/u/17211039?s=400&u=3e7453d910f4015cc90ea5b372302944f70673ab&v=4',
            },

            projects: [
                {
                    title: 'DirectX GUI Overlay and Game Utilities',
                    description: ``,
                    heroShot: require('@/screenshots/overlayss1.png'),
                },
            ],

            desc: `An overlay written in C++ for games using DirectX as
                            their rendering backend. This screenshot shows the
                            tool being used in black ops zombies.`,
        }
    },

    async asyncData({ $content }) {
        const about = await $content('info/about').fetch()
        return { about }
    },

    mounted() {
        window.particlesJS('particles-js', {
            particles: {
                number: {
                    value: 160,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: '#2196F3',
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#2196F3',
                    },
                    polygon: {
                        nb_sides: 5,
                    },
                },
                opacity: {
                    value: 1,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0,
                        sync: false,
                    },
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 4,
                        size_min: 0.3,
                        sync: false,
                    },
                },
                line_linked: {
                    enable: false,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: 'top',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 600,
                    },
                },
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: false,
                        mode: 'bubble',
                    },
                    onclick: {
                        enable: false,
                        mode: 'repulse',
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1,
                        },
                    },
                    bubble: {
                        distance: 250,
                        size: 0,
                        duration: 2,
                        opacity: 0,
                        speed: 3,
                    },
                    repulse: {
                        distance: 400,
                        duration: 0.4,
                    },
                    push: {
                        particles_nb: 4,
                    },
                    remove: {
                        particles_nb: 2,
                    },
                },
            },
            retina_detect: true,
        })
        this.typer = setInterval(() => {
            if (this.splashTextIndex >= this.splashTextFull.length) {
                clearInterval(this.typer)
                return
            }
            this.splashText += this.splashTextFull[this.splashTextIndex++]
        }, 65)
    },
}
</script>

<style lang="scss" scoped>
// SASS Variables.
$text: #fff;

$background: #000000;

body,
html {
    overflow: hidden; /* Hide scrollbars */
}

html::-webkit-scrollbar {
    display: none;
}

canvas {
    display: block;
}

#particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $background;
}

.text {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    color: $text;
    width: 100%;
    max-width: 100vw;
    max-height: 90vh;
    // padding: 2em 3em;
    background: rgba(0, 0, 0, 0.4);
    text-shadow: 0px 0px 2px #153b61;
    font-family: 'Open Sans', sans-serif;
    overflow: show;
}
a {
    padding-left: 0.5em;
    text-decoration: none;
    
}

a:hover {
    text-decoration: underline
}

a:visited {
    padding-left: 0.5em;
}
</style>