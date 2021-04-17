<template>
    <VForm id="contactForm" ref="form" class="" @submit.prevent="sendEmail">
        <VTextField label="Your Name" name="from_name" outlined></VTextField>
        <VTextField label="Your Email" name="email" outlined></VTextField>
        <VTextarea label="Your Message" name="message" outlined></VTextarea>
        <VBtn type="submit">Send message</VBtn>
        <h4 v-if="formSuccess" style="display: inline-block">Success! Your message has been sent, I will get back to you asap!</h4>
    </VForm>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
    name: 'ContactForm',
    data() {
        return {
            formSuccess: false
        }
    },

    methods: {
        sendEmail(e) {
            emailjs.sendForm(
                "service_6b54zid",
                "template_g6gw3gn",
                'contactForm',
                'user_FuYLAZMXcrZ3GZDPnU53m').then(resp => {
                    console.debug(resp)
                    e.target.reset();
                    this.formSuccess = resp.status == 200;
                }
            );
        }
    }

}
</script>

<style lang="scss" scoped>
form {
    width: 55%;
}
</style>
