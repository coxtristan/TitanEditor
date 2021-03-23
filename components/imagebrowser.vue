<template>
    <v-container
        fluid
        class="ma-0 pa-0"
        max-height="75"
        style="overflow: auto; max-height: 75vh; height: 100%"
    >
        <v-divider class=""></v-divider>
<!-- //TODO[low] debounce search field and offload search to a web worker thread to not block UI thread -->
        <v-text-field
            solo
            dense
            v-model="searchText"
            placeholder="Search"
            append-icon="mdi-magnify"
            class="ma-2 px-2"
        ></v-text-field>
        <v-treeview hoverable dense :items="image_urls" :search="searchText">
            <template #prepend="{ item, open }">
                <v-icon v-if="item.children">{{
                    open ? 'mdi-folder-open' : 'mdi-folder'
                }}</v-icon>
                <v-img
                    v-else
                    contain
                    aspect-ratio="1"
                    height="45"
                    width="45"
                    class="elevation-6 hover-riser"
                    :src="item.url"
                    @click="itemClickedHandler(item)"
                >
                    <!-- <template #placeholder
                        ><v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template> -->
                </v-img>
            </template>
            <template #label="{ item }">
                <p
                    @click="itemClickedHandler(item)"
                    class="ma-auto pa-auto hover-riser"
                    :style="{ fontSize: item.children ? '12pt' : '9pt' }"
                >
                    {{ item.name }}
                </p>
            </template>
        </v-treeview>
    </v-container>
</template>

<script>
import {
    S3,
    AWS_CLOUDFRONT_BASEURL,
    AWSS3_ACCESS_POINT,
} from '../plugins/aws.config.js'
import '../plugins/aws-sdk-2.831.0.min.js'
import {v4 as uuidv4 } from 'uuid';

export default {
    data() {
        return {
            image_urls: [],
            searchText: ""
        }
    },
    async fetch() {
        /* Duplicate Etags can exist in an s3 bucket,
         because the ETag is a md5 hash of the content, 
         not a unique generated ID. Do not use ETag as unique ID.
         src: https://forums.aws.amazon.com/thread.jspa?threadID=22743
         */
        
        
        let s3 = S3()
        console.log('hello')
        var params = {
            Bucket: AWSS3_ACCESS_POINT,
            Prefix: 'images/',
            Delimiter: '/',
        }
        let image_cache = {}
        let background_image_cache = {}
        let s3Objects = await s3.listObjectsV2(params).promise()
        // console.log(s3Objects)
        let subfolders = s3Objects.CommonPrefixes.map((common_prefix) => {
            return s3
                .listObjectsV2({
                    Bucket: AWSS3_ACCESS_POINT,
                    Prefix: common_prefix.Prefix,
                })
                .promise()
        })

        let folders = await Promise.all(subfolders)
        const stripOffExtra = (key, leaveLast) =>
            key.slice(
                key.lastIndexOf('/', key.length - 2) + 1,
                key.length - leaveLast
            )
        let test = folders.map((folder) => {
            const name =
                stripOffExtra(folder.Prefix, 1) + ` (${folder.Contents.length})`

            var children = folder.Contents.map((content) => ({
                name: stripOffExtra(content.Key, 0),
                url: AWS_CLOUDFRONT_BASEURL + content.Key,
                id: uuidv4(),
            }))
            children.shift()
            return {
                name,
                children,
                id: uuidv4(),
            }
        })

        console.log(test)
        this.image_urls = test
        // images.CommonPrefixes.forEach(async prefix => {
        //     let images = await s3.listObjectsV2(params).promise()
        // })
        // console.log(images.CommonPrefixes)
        // let image_map = images.Contents.map((entry) => {
        //     return { id: entry.ETag, img: AWS_CLOUDFRONT_BASEURL + entry.Key, name: entry.Key }
        // })
        // this.image_urls = [ {name: "Images", children: image_map } ]
        // console.log(images)
    },

    methods: {
        itemClickedHandler(item) {
            this.$emit('image_clicked', item.url)
        },

    },
}
</script>

<style>
.shadow {
    -webkit-box-shadow: inset -1px 3px 8px 5px #1f87ff, 2px 5px 16px 0px #0b325e,
        19px 8px 15px -7px rgba(0, 0, 0, 0);
    box-shadow: inset -1px 3px 8px 5px #1f87ff, 2px 5px 16px 0px #0b325e,
        19px 8px 15px -7px rgba(0, 0, 0, 0);
    background: #1c6ea4;
}

.hover-riser:hover {
    text-decoration: underline;
    cursor: pointer;
}
body#tinymce {
    background: #ffffff;
}
</style>