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
    // async asyncData({ $content, params }) {
    //     const s3_params = {
    //         Bucket: AWSS3_ACCESS_POINT,
    //         Delimiter: '/', 
    //         Prefix: 'gsc/', // REMOVE DELIMITERTO SIMPLIFY THE DAMN CODE!
    //     }

    //     let initial_query = await s3.listObjectsV2(s3_params).promise()

    //     console.log(initial_query)
    //     let S3_ResolveObjectsRecursive = async (query, directory) => {
    //         if (query.CommonPrefixes.length <= 0) {
    //             return {
    //                 name: directory,
    //                 children: query.Contents.map((content) => content.Key),
    //             }
    //         } else {
    //             let all_levels = [];
    //             query.CommonPrefixes.forEach(async common_prefix => {

    //                 const s3_params = {
    //                     Bucket: AWSS3_ACCESS_POINT,
    //                     Delimiter: '/',
    //                     Prefix: common_prefix.Prefix,
    //                 }
    //                 let x = await s3.listObjectsV2(s3_params).promise()
    //                 let children = await S3_ResolveObjectsRecursive(x, common_prefix.Prefix);
    //                 console.log("children", children)
    //                 all_levels.push(children);
    //             })
    //             return all_levels;
    //         }
    //     }
    //     let all_code = []

    //     initial_query.CommonPrefixes.forEach(async (common_prefix) => {
    //         const s3_params = {
    //             Bucket: AWSS3_ACCESS_POINT,
    //             Delimiter: '/',
    //             Prefix: common_prefix.Prefix,
    //         }

    //         let queryResult = await s3.listObjectsV2(s3_params).promise();

    //         all_code.push(
    //             await S3_ResolveObjectsRecursive(
    //                 queryResult,
    //                 common_prefix.Prefix
    //             )
    //         )
    //     });

    //     all_code = all_code.filter(elem => typeof(elem) == "object")
    //     // console.log(await S3_ResolveObjectsRecursive(initial_query, "/"))
    //     console.log("all_code", all_code);
        
    //     return {all_code}
    // },

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