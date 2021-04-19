<template>
    <nav>
        <div class="navbar">
            <div :class="{'nav-links': true, 'nav-active': showMobileNav}">
                <NuxtLink class="link" to="/">/portfolio</NuxtLink>
                <a class="link" href="https://tristanshostedfiles.s3.amazonaws.com/TristanCoxResume.pdf" target="_blank" download="TristanCoxResume">/resume</a>
                <NuxtLink class="link" to="/contact">/contact</NuxtLink>
                <NuxtLink class="link" to="/designer">/anomaly</NuxtLink>
            </div>
            <div class="nav-burger" @click="showMobileNav = !showMobileNav">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
        </div>

    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            showMobileNav: false,
        }
    },

    methods: {

    }
}

</script>

<style lang="scss" scoped>
a {
    font-family: "JetBrains Mono", "monospace";
    font-size: 24px;
    padding: 0px 25px 0px 0px !important;
    margin: 0;
    margin-left: 25px;
    text-decoration: none;
    color: $secondary !important;

}

.active-link {
    color: $highlight !important;
}

.navbar {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
    padding-right: 5%;
    padding-top: 1rem;
}

.nav-links{
    display: flex;
    justify-content: end;
    align-content: flex-end;
}


.nav-burger{
    cursor: pointer;
    display: none;
}



.line1{
    height: 2px;
    width: 35px;
    margin: 0.5rem 0;
    background: $primary;
}

.line2{
    height: 2px;
    width: 35px;
    margin: 0.5rem 0;
    background: $primary;
}

.line3{
    height: 2px;
    width: 35px;
    margin: 0.5rem 0;
    background: $primary;
}

.link{
    display: block;
}

.nav-active{
    transform: translateX(0%) !important;

}



@media only screen and (max-width: 768px) {

    .nav-burger {display: block; z-index: 1;} // show the nav burger
    body{
        overflow-x: hidden;
    }

    .nav-links{
        position: absolute;
        right: 0px;

        top: 4rem;

        background-color: rgba(.5, .5, .5, .5);
        flex-direction: column;
        justify-content: flex-start;
        transform: translateX(100%);
        transition: transform 190ms ease-in;


    }
    .nav-links :last-child{
        margin-bottom: 1rem;
    }
    .link{
        font-size: 1rem;
        margin-top: 1rem;

    }


}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .nav-burger {display: none}
    .link { display: block }


}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {

}

</style>
