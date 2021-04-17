<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-treeview open-all :items="file_tree"></v-treeview>
                <h1 class="text--blue">COMING SOON</h1>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>
</template>

<script>
import {
    S3,
    AWSS3_ACCESS_POINT,
    AWS_CLOUDFRONT_BASEURL,
} from "../plugins/aws.config.js";
let s3 = S3();

import { v4 as uuidv4 } from "uuid";

export default {
    async asyncData({ $content, params }) {
        const s3_params = {
            Bucket: AWSS3_ACCESS_POINT,

            Prefix: "gsc/scripts/",
        };

        let initial_query = await s3.listObjectsV2(s3_params).promise();

        let files = initial_query.Contents.map(
            (c) => c.Key.split(s3_params.Prefix)[1]
        );

        // file_tree.filter(e => e.hasOwnProperty('name') && e.name == path_array[path_index]).length <= 0
        const addFile = (file_tree, path_array, path_index) => {
            // if we reached the end, then we can just set the
            if (file_tree.length == 0) {
                file_tree.push({
                    name: path_array[path_index],
                    id: uuidv4(),
                    children: [],
                });
            }
            console.log(file_tree, path_array, path_index);

            // set the file itself (name = "code.gsc") or something like that, because we are at the bottom fo the tree branch that the file belongs to
            if (path_index >= path_array.length) {
                // file_tree.children.push({
                //     name: path_array[path_index -1 ],
                //     id: uuidv4(),
                //     children: []
                // })
            } else {
                let added = {
                    name: path_array[path_index],
                    id: uuidv4(),
                    children: [],
                };
                file_tree.push(added);
                addFile(added.children, path_array, path_index + 1);
            }
        };
        let file_tree = [];
        for (var file of files) {
            addFile(file_tree, file.split("/"), 0);
        }

        return { file_tree };
    },

    mounted() {},

    methods: {},
};
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