<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <!-- <v-treeview :items="all_code"></v-treeview> -->
                <h1 class="text--blue">COMING SOON</h1>
            </v-col>
            <v-col>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {
    S3,
    AWSS3_ACCESS_POINT,
    AWS_CLOUDFRONT_BASEURL,
} from '../plugins/aws.config.js'
let s3 = S3()

export default {
    async asyncData({ $content, params }) {
        const s3_params = {
            Bucket: AWSS3_ACCESS_POINT,
            Delimiter: '/', 
            Prefix: 'gsc/', //TODO //FIXME remove delimiter and parse s3 bucket object listing
        }
        
        // let initial_query = await s3.listObjectsV2(s3_params).promise()
    },

    mounted() {},

    methods: {},
}
</script>

<style lang="scss">
.nuxt-content h1 {
    color: white;
}

.nuxt-content pre {
    background-color: rgb(15, 15, 15) !important;
}

.nuxt-content code {
    background-color: rgb(15, 15, 15) !important;
}
</style>