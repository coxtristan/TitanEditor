<template>
<v-container >
    <v-card class="ma-auto pa-auto elevation-5" style="">
        <nuxt-content class="pa-4 " :document="about"/>
    </v-card>

</v-container>
</template>

<script>
export default {
    async asyncData({$content}) {
        const about = await $content('info/about').fetch()
        return {about}
    }
}
</script>

<style>

</style>