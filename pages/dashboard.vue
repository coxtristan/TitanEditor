<template>
    <VContainer>
        <div>
            <h2>Dashboard</h2>
            <small style="text-transform: uppercase">{{ user.userId }}</small>
            <VBtn
                class="ma-4"
                outlined
                color="blue"
                :loading="isRefreshing"
                @click="refresh">
                Refresh
            </VBtn>
        </div>
        <VDivider></VDivider>
        <div v-if="projects.length < 1">
            <p style="text-align: center; width: 100%">Looks kinda empty around here...</p>
        </div>
        <div class="portfolio-grid">
            <NewProjectDialogue @created="handleCreated"/>
            <Project @projectDeleted="handleDeleted" v-for="proj in projects" :project="proj"/>
        </div>
    </VContainer>
</template>

<script>
import Project from '@/components/Project'
import dashboard from "~/layouts/dashboard";
import NewProjectDialogue from "~/components/newprojectdialogue";

export default {
    name: "dashboard",
    components: {NewProjectDialogue},
    layout: 'dashboard',
    data() {
        return {
            projects: [],
            isRefreshing: false,
        }
    },

    computed: {
        user() {
            return this.$store.state.user;
        }

    },

    async mounted() {
        if (!this.user.signedIn) {
            this.$router.push('/login');
        }
        /*for (let i = 1; i <= 20; i++) {
            this.projects.push({
                title: `Project ${i}`,
                description: 'Project Description about how its really cool',
                thumbnail: require('@/screenshots/overlayss1.png')
            })

        }*/
        console.log('getting user projects', this.user.userId)
        try {
            let resp = await this.$axios.$get(`http://localhost:3001/projects/${this.user.userId}`, {
                headers: {'Authorization': `Bearer ${this.user.access_token}`}
            })
            console.log('users projects', resp);
            this.projects = resp.filter(p => p);

        } catch (e) {

        }

    },

    methods: {
        handleCreated(project) {
            this.projects = [project, ...this.projects];
        },

        handleDeleted(project) {
            this.projects = this.projects.filter(p => p._id != project);
            console.log(this.projects)
        },

        async refresh() {
            this.isRefreshing = true;
            if (!this.user.signedIn) {
                this.$router.push('/login');
            }

            console.log('getting user projects', this.user.userId)
            try {
                let resp = await this.$axios.$get(`http://localhost:3001/projects/${this.user.userId}`, {
                    headers: {'Authorization': `Bearer ${this.user.access_token}`}
                })
                console.log('users projects', resp);
                this.projects = resp.filter(p => p);

            } catch (e) {

            }
            this.isRefreshing = false;
        }

    }
}
</script>

<style scoped lang="scss">
.portfolio-grid {
    display: grid;
    max-width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
}
</style>
