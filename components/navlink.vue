<template>
    <NuxtLink :href="to" @click="">{{title}}</NuxtLink>
</template>

<script>
export default {
    name: 'Navlink',
    props: ['to', 'title', 'active']
}

</script>

<style>

</style>
