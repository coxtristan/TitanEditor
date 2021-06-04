<template>
    <div>
        <VCard class="pa-5 ma-5 elevation-5" outlined>
            <VForm @submit.prevent="createNewProject">
                <p>Create a new Project</p>
                <VTextField label="Title" name="projectTitle" v-model="projectTitle" outlined></VTextField>
                <VTextarea label="Description" name="projectDescription" v-model="projectDescription"
                           outlined></VTextarea>
                <VBtn type="submit" outlined color="blue">Create project</VBtn>
                <!--                <VTextField label="Title" name="projectTitle" outlined></VTextField>-->
            </VForm>

        </VCard>
    </div>
</template>

<script>
export default {
    name: "NewProjectDialogue",

    data() {
        return {
            projectTitle: '',
            projectDescription: ''
        }
    },

    computed: {
        user() {
            return this.$store.state.user;
        }
    },

    methods: {
        async createNewProject(e) {
            console.log(this.projectTitle, this.projectDescription);
            try {
                let resp = await this.$axios.post('http://localhost:3001/projects/new', {
                    userId: this.user.userId,
                    projectTitle: this.projectTitle,
                    projectDescription: this.projectDescription
                });
                this.$emit('created', resp.data);
                console.log(resp);
            }catch(e) {
                console.log(e);
            }
        }
    }

}
</script>

<style scoped>

</style>
