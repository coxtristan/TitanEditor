<template>
    <VContainer fluid class="ma-auto pa-auto background-create-account flex d-flex">
        <!-- <v-img src="https://wallpapercave.com/wp/wp2232276.jpg"></v-img> -->
        <VForm class="ma-auto pa-auto" @submit.prevent="signupAction">
            <VContainer outlined
                        class="ma-auto pa-8 grey darken-4 rounded-lg outlined justify-center align-center elevation-9">

                <h2 class="text-center mb-0 pb-0">Create an Account</h2>
                <VDivider class="mb-8 wider mx-auto align-center"></VDivider>

                <VTextField
                    flat
                    outlined
                    width="50em"
                    v-model="username"
                    label="username"
                    class="mx-8 mt-2"
                ></VTextField>
                <VTextField
                    flat
                    outlined
                    v-model="email"
                    label="email"
                    class="mx-8 wider"
                ></VTextField>
                <VTextField
                    flat
                    outlined
                    v-model="password"
                    label="password"
                    type="password"
                    class="mx-8"
                ></VTextField>
                <VContainer fluid class="d-flex mb-0 pb-0">
                    <VBtn color="blue" large outlined fluid class="mx-auto mt-0 justify-center align-center" type="submit">
                        Create New Account
                    </VBtn>
                </VContainer>
                <VContainer>
                    <p class="text-center text-caption ma-0 pa-0">Creating an account allows you to save your work. </p>
                    <p class="text-center text-caption mb-0 pb-0">Email is optional, and is not stored in plain
                        text.</p>
                </VContainer>
            </VContainer>
            <p v-if="status.msg.length > 0"
               class="px-2 ma-0 rounded-lg"
               :class="{'red': status.error, 'blue': !status.error}"
               style="width: 100%;"
            >{{ status.msg }}</p>
        </VForm>
    </VContainer>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            status: {
                msg: '',
                error: false
            }

        }
    },

    methods: {
        validateInput() {
            return (this.username.length > 5 && !this.username.includes(' ')) && (this.password.length > 5 && !this.password.includes(' '));
        },

        async signupAction() {
            if (!this.validateInput()) {
                this.status.msg = "Username and password must be longer than 5 characters and not contain spaces";
                this.status.error = true;
                return;
            }
            try {

                let resp = await this.$axios.post('http://localhost:3001/users/signup', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                });
                console.log(resp)
                this.status.msg = "Account created successfully!";
                this.status.error = false;

            } catch (e) {
                console.error(e)
                this.status.msg = "There was an error, please try again or contact me via email (cox.tristan.tc@gmail.com) or discord (Mystic#9127) if you found a bug.";
                this.status.error = true;
            }
        }
    }
}
</script>

<style lang="scss">
.background-create-account {
    width: 100vw;
    height: 100vh;


    background: url('https://wallpapercave.com/wp/wp2232276.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.wider {
    width: 30em;
}
</style>
