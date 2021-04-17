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
                            <v-row
                                class="mb-4 pa-auto"
                                align="center"
                                justify="start"
                            >
                                <v-icon>mdi-github</v-icon>
                                <a
                                    class="blue--text elevation-3"
                                    :href="contactInfo.github"
                                    target="_blank"
                                    >{{ contactInfo.github }}</a
                                >
                            </v-row>
                            <v-row
                                class="mb-4 pa-auto"
                                align="center"
                                justify="start"
                            >
                                <v-icon>mdi-gmail</v-icon>
                                <a
                                    class="blue--text elevation-3"
                                    :href="'mailto:' + contactInfo.email"
                                    target="_blank"
                                    >{{ contactInfo.email }}</a
                                >
                            </v-row>

                            <v-row
                                class="mb-4 pa-auto"
                                align="center"
                                justify="start"
                            >
                                <v-icon>mdi-discord</v-icon>
                                <span
                                    class="blue--text elevation-3 pl-2"
                                    :href="contactInfo.discord"
                                    >{{ contactInfo.discord }}</span
                                >
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>

            <v-container
                fluid
                style="min-height: 100vh"
                :class="`ma-0 pa-0 ${project.color}`"
                v-for="project in projects"
                :key="project.id"
            >
                <v-spacer></v-spacer>
                <v-row no-gutters justify="center" style="min-height: 100vh">
                    <v-col align="left" class="ma-4 pa-4">
                        <h1>{{ project.title }}</h1>
                        <a
                            class="blue--text"
                            :href="project.github"
                            target="_blank"
                            >View Source on Github</a
                        ><v-icon>mdi-open-in-new</v-icon>
                        <v-btn v-if="project.tryit" :to="project.tryit.goto"
                            >{{ project.tryit.buttonTitle }}
                            <v-icon v-if="project.tryit.buttonIcon">{{
                                project.tryit.buttonIcon
                            }}</v-icon></v-btn
                        >
                        <v-container v-if="project.tech" class="ma-0 pa-5">
                            <v-row align="start" class="py-4">
                                <h3>Technology, Languages or Tools Used</h3>
                            </v-row>
                            <v-row
                                align="start"
                                v-for="technology in project.tech"
                                :key="technology.name"
                            >
                                <p>
                                    <v-icon v-if="technology.icon">{{
                                        technology.icon
                                    }}</v-icon>
                                    {{ technology.name }}
                                </p>
                            </v-row>
                        </v-container>
                        <v-container fluid style="width: max-content">
                            <v-row style="max-width: 75%" class="ma-auto">
                                <v-img
                                    contain
                                    :src="project.heroShot"
                                    style="
                                        height: 50%;

                                        object-fit: contain;
                                        display: block;
                                    "
                                />
                            </v-row>
                            <v-row>
                                <v-card-text
                                    style="text-align: left; max-width: 75%"
                                    class="mx-auto px-auto"
                                >
                                    {{ project.description }}
                                </v-card-text>
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
                    color: 'grey darken-4',
                    title: 'DirectX GUI Overlay and Game Utilities',
                    github: 'https://github.com/coxtristan/COD7-Tools',
                    description: `This project was a way for myself to learn about the inner-workings of 3D graphics engines.
                    I've learned that taking something apart so that you can understand it well enough to extend its capabilities is the way I learn best.
                    One of the most interesting things I found while implementing the DirectX9 hook required to draw the ImGui menu was how COM Objects, such as IDirect3D9Device, do not share VTables.
                    A VTable (short for "Virtual Method Table) is simply an array of function pointers and is one of the primary mechanisms for polymorphism in C++.
                    This fact came up when deciding the technique I would use to "capture" the game engines IDirect3D9Device pointer, which is used for issuing draw calls and managing D3D state.
                    My initial approach was to create a "dummy" D3D Device of my own, and overwrite its vtable with one that I crafted to allow my injected code to run.
                    This failed, because COM Objects do not share vtable pointers. In reality, they each store a pointer to a copy of the vtable. However, each entry in the vtable pointed to the same function,
                    meaning both the game and my fake D3D instance were calling the same functions, located in the same place in memory.
                    Once having figured that out through the use of a debugger (I prefer x86dbg), my next approach would be more successful.
                    I now used the fake D3D Device that I created to learn the location of certain functions that would be used by both instances. I now copied the vtable from the fake device, and installed a "capture hook" which would essentially redirect code execution from the original virtual function to my own code, which would save the "this" pointer, set a flag that the device was captured,
                    and uninstall the hook before the next frame was pushed to the screen.
                    `,
                    tech: [
                        {
                            name: 'C++',
                            icon: 'mdi-language-cpp',
                        },
                        {
                            name: 'x64dbg',
                            icon: 'mdi-spider',
                        },
                        {
                            name: 'Capstone Disassembly Engine',
                            icon: 'mdi-hexadecimal',
                        },
                    ],

                    heroShot: require('@/screenshots/overlayss1.png'),
                    id: 0,
                },
                {
                    color: 'grey darken-3',
                    title: 'Anomaly - Web-based GUI Design Tool',
                    tryit: {
                        buttonTitle: 'Try Anomaly',
                        buttonIcon: 'mdi-open-in-new',
                        goto: '/designer',
                    },
                    github: 'https://github.com/coxtristan/TitanEditor',
                    description: `
                    Anomaly is a web-based tool that allows easy manipulation of images and text, and then converts the canvas scene to LUA code.
                    One of the biggest issues in modding games is the lack of proper tools.
                    This makes implementing interesting ideas far more difficult than it should be. For instance, when trying to position an image properly for an in-game user interface,
                    pixel-perfect positioning entails making a guess at the correct coordinate values, waiting about 5 minutes for the game to load,
                     making a slight adjustment to the position of the image, and then repeating the previous steps  until its "close enough".
                    This process can easily waste 30 minutes just trying to get an image in the right spot!
                    "Anomaly" is a tool I developed to help solve this issue by providing content developers a more efficient way to create their ideas. Getting pixel-perfect positioning for on-screen elements
                    is now possible in about 10 minutes *total*, from opening the website, to selecting the images you want to use, to downloading the generated code and installing it in the game.
                    This tool also reduces the barrier to entry for custom content creation by allowing people who don't know how to code use a simple tool that will code just about everything for them. `,
                    heroShot: require('@/screenshots/anomalyss1.png'),
                    tech: [
                        {
                            name: 'Amazon AWS',
                            icon: 'mdi-aws',
                        },
                        {
                            name: 'KonvaJS',
                            icon: 'mdi-brush',
                        },
                        {
                            name: 'Lua',
                            icon: 'mdi-language-lua',
                        },
                        {
                            name: 'NodeJS',
                            icon: 'mdi-nodejs',
                        },
                        {
                            name: 'NuxtJS',
                            icon: 'mdi-nuxt',
                        },
                        { name: 'VueJS', icon: 'mdi-vuejs' },
                        {
                            name: 'Vuetify',
                            icon: 'mdi-vuetify',
                        },
                    ],
                    id: 1,
                },
                {
                    color: 'grey darken-1',
                    title: 'Commission Tracker',
                    github: 'https://github.com/coxtristan/CommsApp',
                    tech: [
                        { name: 'Nativescript-Vue', icon: 'mdi-nativescript' },
                    ],
                    description: `This commission tracker app is written using Nativescript-Vue for android. Freelance artists need to keep track of commission requirements, their clients' contact information, agreed-upon pricing, and completion status. This app allows freelance artists to efficiently store that crucial information. `,
                    heroShot: require('@/screenshots/phoness1.png'),
                    id: 2,
                },
            ],
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
    margin-top: -75px;
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
    text-decoration: underline;
}

a:visited {
    padding-left: 0.5em;
}
</style>