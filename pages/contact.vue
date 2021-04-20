<template>
    <section>
        <h1>Want to hire me?</h1>
        <h3>Great! Send me an email, and I will get back to you as soon as possible!</h3>
        <p>I work with a wide range of technologies, I do everything from UI design to implementation of backend APIs, to reverse engineering and game modding.</p>
        <ContactForm/>
    </section>
</template>

<script>
import ContactForm from "~/components/contactform";
export default {
    name: 'contact',
    layout: 'portfolio',
    components: {
        ContactForm
    }
}
</script>

<style scoped lang="scss">
section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    margin: auto;
    h1{
        font-size: 5vw;
        color: $primary;
        white-space: nowrap;
    }
    * {
        width: 55%;
    }

}

@media only screen and (max-width: 768px) {
    section{
        width: 100%;
        h1{
            width: 100%;
            text-align: center;
            font-size: 4vh;
            color: $primary;
            white-space: nowrap;
        }
        * {
            width: 90%;
        }
        form{
            width: 90%;
        }
    }
}

@media only screen and (min-width: 768px) {

}



</style>
