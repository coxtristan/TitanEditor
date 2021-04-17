<template>
    <VContainer :style="{backgroundColor: bgColor}" class="ma-0  py-4 fullscreen" fluid>
        <h1 class="ma-auto mb-8">{{ project.title }}</h1>
        <VContainer>
            <VRow>
                <VCol>
                    <VCard class="black elevation-4 " style="width: 100%">
                        <VRow v-for="(tech, index) in project.tech" :key="project.id">
                            <VIcon class="ml-8 blue--text" :class="{'mt-4': index == project.tech.length}">{{ tech.icon }}</VIcon>
                            <p class="ma-0 ml-4 pa-0">{{ tech.name }}</p>
                        </VRow>

                    </VCard>
                    <VImg :aspect-ratio="16/9" :src="project.heroShot" class="mt-5"
                          style="max-height: 90%; max-width: 90%"></VImg>
                </VCol>
                <VCol>
                    <VRow class="mb-4">
                        <VCard class="black elevation-4" style="width: 100%">
                            <!--                            <VIcon color="white" class="ma-auto pa-4">mdi-github</VIcon>-->
                            <VRow>
                                <VIcon class="ml-8" color="blue">mdi-github</VIcon>
                                <a :href="project.github" class="ma-2 pa-2 blue--text" target="_blank">
                                    {{ project.github }}
                                </a>
                            </VRow>
                            <VRow v-if="project.tryit">
                                <VIcon class="ml-8" color="blue">mdi-open-in-new</VIcon>
                                <a :href="project.github" class="ma-2 pa-2 blue--text" target="_blank">
                                    {{ project.github }}
                                </a>
                            </VRow>
                        </VCard>
                    </VRow>
                    <VRow>
                        <VCard class="black ma-auto">
                            <p>
                                {{ project.description }}
                            </p>
                        </VCard>
                    </VRow>
                </VCol>
            </VRow>
            <VRow>

            </VRow>
        </VContainer>
    </VContainer>
</template>

<script>
export default {
    props: ['project', 'bgColor'],
    data () {
        return {}
    },

}
</script>

<style lang="scss" module>

h1 {
    text-align: center;
}

p {
    margin: auto;
    padding: 2em;
}

a {
    margin: auto;
    padding: 2em;
}

.fullscreen {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    //overflow: scroll;
}
</style>