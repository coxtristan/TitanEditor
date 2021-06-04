<template>
    <VContainer fluid class="ma-auto pa-auto background-login flex d-flex">
        <!-- <v-img src="https://wallpapercave.com/wp/wp2232276.jpg"></v-img> -->
        <VForm class="ma-auto pa-auto" @submit.prevent="loginAction">
            <VContainer
                outlined
                class="ma-auto pa-8 grey darken-4 rounded-lg outlined justify-center align-center elevation-9"
            >
                <h2 class="text-center mb-0 pb-0">Login</h2>
                <VDivider class="mb-8 wider mx-auto align-center"></VDivider>

                <VTextField
                    flat
                    outlined
                    v-model="username"
                    label="username"
                    class="mx-8 mt-2 wider"
                ></VTextField>

                <VTextField
                    flat
                    outlined
                    v-model="password"
                    label="password"
                    type="password"
                    class="mx-8 wider"
                ></VTextField>
                <VContainer fluid class="d-flex mb-0 pb-0 wider">
                    <VBtn
                        color="green"
                        large
                        outlined
                        fluid
                        class="mx-auto mt-0 justify-center align-center"
                        type="submit"
                        >Login</VBtn
                    >
                    <VBtn
                        color=""
                        large
                        outlined
                        fluid
                        class="mx-auto mt-0 justify-center align-center"
                        to="/signup"
                        >Create New Account</VBtn
                    >
                </VContainer>
                <!-- <v-container>
                    <p class="text-center text-caption ma-0 pa-0">Creating an account allows you to save your work. </p>
                    <p class="text-center text-caption mb-0 pb-0">Email is optional, and is not stored in plain text.</p>
                </v-container> -->
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
            username: "",
            password: "",
            status: {
                msg: '',
                error: false
            }
        }
    },

    methods: {
        async loginAction() {
            console.log('logging in ', this.username, this.password);
            try{
                let resp = await this.$axios.post('http://localhost:3001/auth/login', {
                    username: this.username,
                    password: this.password
                });
                this.status.msg = "Login Successful";
                this.status.error = false;
                console.log(resp);
                this.$store.commit('setUser', {
                    username: this.username,
                    access_token: resp.data.access_token,
                    userId: resp.data.id,
                    signedIn: true
                });
                setTimeout(() => {
                    this.$router.push('/dashboard');
                }, 400);

            }catch (e) {
                this.status.msg = "Username or password incorrect";
                this.status.error = true
                // console.log("Username or password incorrect")
                // console.error(e);
            }
        }
    }


}
</script>

<style lang="scss">
.background-login {
    width: 100vw;
    height: 100vh;

    background: url('https://cdn.wallpapersafari.com/87/26/MFXmca.png')
        no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.wider {
    width: 30em;
}
</style>
