<template>
    <div class="project pa-5 ma-5 rounded-lg outlined">
        <p style="opacity: 50%; font-size: small">Title:</p>
        <VTextField v-model="project.projectTitle"
                    :outlined="canEditTitle"
                    append-icon="mdi-pen"
                    flat
                    dense
                    color="blue"
                    :readonly="!canEditTitle"
                    :filled="!canEditTitle"
                    :solo="!canEditTitle"
                    :hint="editHint"
                    @click:append="canEditTitle = !canEditTitle; editHint = '';"
                    @input="hasChangesToSave = true"
                    @focusout="canEditTitle = false"
                    @focusin="editHint = (canEditTitle) ? '': 'click the pen icon to edit'"

        />

        <p style="opacity: 50%; font-size: small">Description:</p>
        <VTextarea v-model="project.projectDescription"
                   :outlined="canEditDescription"
                   append-icon="mdi-pen"
                   background-color=""
                   :readonly="!canEditDescription"
                   :filled="!canEditDescription"
                   :solo="!canEditDescription"
                   :hint="descEditHint"
                   @click:append="canEditDescription = true; descEditHint = '';"
                   @input="hasChangesToSave = true"
                   @focusout="canEditDescription = false"
                   @focusin="descEditHint = (canEditDescription) ? '': 'click the pen icon to edit'"
        />

        <img :src="project.thumbnail" alt="" class="thumbnail">
        <VBtn color="blue" outlined small @click="openInEditor">
            Edit Project
            <VIcon>mdi-pen</VIcon>
        </VBtn>
        <VBtn color="blue" outlined small>Download
            <VIcon>mdi-download</VIcon>
        </VBtn>
        <VDialog transition="dialog-bottom-transition" max-width="600">
            <template #activator="{on, attrs}">
                <VBtn color="red" outlined small v-on="on" v-bind="attrs">
                    Delete
                    <VIcon>
                        mdi-remove
                    </VIcon>
                </VBtn>

            </template>
            <template #default="dialog">
                <VCard class="elevation-5 pa-5" outlined>
                    <h1 class="red" style="text-align: center">Are you sure?</h1>
                    <p class="pa-4">There is no way to recover a deleted project. Are you sure you want to delete
                        it?</p>
                    <VCardActions>
                        <VBtn @click="deleteProject" color="red"> Yes, I am sure.</VBtn>
                        <VBtn @click="dialog.value = false" color="blue"> No, don't delete it</VBtn>
                    </VCardActions>
                </VCard>
            </template>
        </VDialog>

        <VBtn v-if="hasChangesToSave"
              color="green"
              small
              outlined
              @click="updateProject">
            Save Changes
        </VBtn>

    </div>
</template>

<script>
/*
projectDescription: (...)
projectSource: (...)
projectTitle: (...)
*/
export default {
    name: "Project",
    props: ['project'],
    data() {
        return {
            canEditTitle: false,
            canEditDescription: false,
            hasChangesToSave: false,
            editHint: '',
            descEditHint: ''
        }
    },
    methods: {
        async deleteProject() {
            let resp = await this.$axios.$delete(`http://localhost:3001/projects/${this.project._id}`);
            console.log(resp);
            this.$emit('projectDeleted', this.project._id);

        },

        async updateProject() {
            console.log('updating project');
            console.log('projects', this.project.projectTitle, this.project.projectDescription);
            try {

                let resp = await this.$axios.patch(`http://localhost:3001/projects/${this.project._id}`,
                    {
                        projectData: {
                            projectTitle: this.project.projectTitle,
                            projectDescription: this.project.projectDescription
                        }
                    });
                this.hasChangesToSave = false;

            } catch (e) {

            }
        },


        openInEditor() {
            this.$store.commit('currentProjectId', this.project._id);
            this.$router.push('/designer')
        }


    }
}
</script>

<style scoped lang="scss">
.project:hover {
}

.project {
    border: 1px $primary solid;
}

.thumbnail {
    max-width: 50%;
    max-height: 50%;
}
</style>
