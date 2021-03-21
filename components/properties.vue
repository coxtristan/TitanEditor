<template>
    <v-container fluid class="">
        <p class="text-center blue--text ma-0 mt-1">Properties</p>
        <v-divider></v-divider>
        
            
        <!-- <v-container class="my-3">
            <v-row v-for="attr in Object.keys(elementAttrs)" :key="attr" class="pa-3">
                <v-text-field
                    dense
                    :label="attr"
                    :value="elementAttrs[attr]"
                ></v-text-field>
            </v-row>

            <v-divider></v-divider>
            <p class="text-center blue--text ma-0 mt-1">SubscribeToModel</p>
            <v-divider></v-divider>

            <v-row class="pa-3">
                <v-combobox
                    :items="availableModels.UIVisibilityBit"
                    label="UIVisibilityBit"
                ></v-combobox>
            </v-row>
            <v-row class="pa-3">
                <v-combobox
                    :items="availableModels.CurrentWeapon"
                    label="CurrentWeapon"
                ></v-combobox>
            </v-row>
            <v-row class="pa-3">
                <v-combobox
                    :items="availableModels.hudItems"
                    label="hudItems"
                ></v-combobox>
            </v-row>
        </v-container> -->
    </v-container>
</template>

<script>
// TODO display currently selected group or objects attrs
import KonvaAPI from 'konva'
export default {
    name: 'Properties',
    // props: ['attrs'],
    data() {
        return {
            availableModels: {
                CurrentWeapon: [
                    'aat',
                    'aatIcon',
                    'ammoClipPercent',
                    'ammoInClip',
                    'ammoInDWClip',
                    'ammoStock',
                    'clipMaxAmmo',
                    'currentShotCharge',
                    'equippedWeaponReference',
                    'lockedOnEnemy',
                    'lockedOnEnemyTeamHacking',
                    'lockedOnEnemyTeamTargetting',
                    'lockedOnEnemyTeamTargetting',
                    'lockedOnEnemyTimeRemaining',
                    'lockOnWidget',
                    'updateWeaponSelect',
                    'usingOffhand',
                    'viewmodelWeaponName',
                    'weapon',
                    'weaponOverEnemy',
                    'weaponReticle',
                ],

                hudItems: [
                    'actionSlot1ammo',
                    'actionSlot2ammo',
                    'actionSlot3ammo',
                    'ammoPickedUp',
                    'amorOverlay',
                    'cursorHintIconRatio',
                    'cursorHintImage',
                    'cursorHintText',
                    'cybercomActiveType',
                    'cybercomRequestedType',
                    'doublePointsActive',
                    'dpadLeftAmmo',
                    'game_end_time',
                    'perks',
                    'playerSpawned',
                    'pulseNoAmmo',
                    'pulseNoLethal',
                    'pulseNoTactical',
                    'shockImageBottom',
                    'shockImageLeft',
                    'shockImageRight',
                    'shockImageTop',
                    'showCursorHint',
                    'showDpadDown_HackTool',
                    'showDpadDown_PES',
                    'showDpadDown',
                    'showDpadLeft_Staff',
                    'showDpadLeft_WaveGun',
                    'showDpadLeft',
                    'showDpadLeftAmmo',
                    'showDpadRight_Chicken',
                    'showDpadRight_DragonStrike',
                    'showDpadRight_Drone',
                    'showDpadRight_Gateworm',
                    'showDpadRight_Spider',
                    'showDpadRight',
                    'showDpadUp',
                    'stickyImage',
                    'time.quest_complete_time',
                    'time.round_complete_num',
                    'time.round_complete_time',
                    'voipInfo',
                ],

                UIVisibilityBit: [
                    'BIT_ADS_JAVELIN',
                    'BIT_AMMO_COUNTER_HIDE',
                    'BIT_BOMB_TIMER_A',
                    'BIT_BOMB_TIMER_B',
                    'BIT_BOMB_TIMER',
                    'BIT_CAMERA_ANIM_HIDING_HUD',
                    'BIT_COMPASS_VISIBLE',
                    'BIT_COUNTER_UAV_ACTIVE',
                    'BIT_DEMO_ALL_GAME_HUD_HIDDEN',
                    'BIT_DEMO_CAMERA_MODE_MOVIECAM',
                    'BIT_DEMO_CAMERA_MODE_THIRDPERSON',
                    'BIT_DEMO_HUD_HIDDEN',
                    'BIT_DISABLE_INGAME_MENU',
                    'BIT_DRAW_RETICLE',
                    'BIT_DRAW_SPECTATOR_MESSAGES',
                    'BIT_EMP_ACTIVE',
                    'BIT_ENABLE_POPUPS',
                    'BIT_EXTRACAM_ACTIVE',
                    'BIT_EXTRACAM_ON',
                    'BIT_EXTRACAM_STATIC',
                    'BIT_FINAL_KILLCAM',
                    'BIT_G_COMPASS_SHOW_ENEMIES',
                    'BIT_GAME_ENDED',
                    'BIT_HIDE_FOR_FULLSCREEN_MENU',
                    'BIT_HUD_HARDCORE',
                    'BIT_HUD_OBITUARIES',
                    'BIT_HUD_SHOWOBJICONS',
                    'BIT_HUD_VISIBLE',
                    'BIT_IN_GUIDED_MISSILE',
                    'BIT_IN_KILLCAM',
                    'BIT_IN_REMOTE_KILLSTREAK_STATIC',
                    'BIT_IN_REMOTE_MISSILE',
                    'BIT_IN_VEHICLE',
                    'BIT_IS_DEMO_MOVIE_RENDERING',
                    'BIT_IS_DEMO_PLAYING',
                    'BIT_IS_FLASH_BANGED',
                    'BIT_IS_FUEL_WEAPON',
                    'BIT_IS_PLAYER_IN_AFTERLIFE',
                    'BIT_IS_PLAYER_ZOMBIE',
                    'BIT_IS_SCOPED',
                    'BIT_IS_THIRD_PERSON',
                    'BIT_MIGRATING_HOST',
                    'BIT_NEMESIS_KILLCAM',
                    'BIT_OVERTIME',
                    'BIT_PLAYER_DEAD',
                    'BIT_POF_FOLLOW',
                    'BIT_POF_SPEC_ALLOW_FREELOOK',
                    'BIT_POPUPS_VISIBLE',
                    'BIT_RADAR_ALLIES',
                    'BIT_RADAR_AXIS',
                    'BIT_RADAR_CLIENT',
                    'BIT_ROUND_END_KILLCAM',
                    'BIT_SCOREBOARD_OPEN',
                    'BIT_SELECTING_LOCATION',
                    'BIT_SELECTING_LOCATIONAL_KILLSTREAK',
                    'BIT_SPECTATING_CLIENT',
                    'BIT_TEAM_ALLIES',
                    'BIT_TEAM_AXIS',
                    'BIT_TEAM_FREE',
                    'BIT_TEAM_SPECTATOR',
                    'BIT_TOTAL_COVERAGE_ACTIVE',
                    'BIT_UI_ACTIVE',
                    'BIT_WEAPON_HUD_VISIBLE',
                    'UI_CLIENT_AND_MATCH_HIGHEST_VISIBILITY_BIT',
                    'UI_CLIENT_HIGHEST_VISIBILITY_BIT',
                    'UI_VISIBILITY_BIT_COUNT',
                ],
            },

            elementAttrs: new KonvaAPI.Rect({
                x: 0,
                y: 0,
                width: 1,
                height: 1,
            }).getAttrs(),
            count: 0
        }
    },

    computed: {
        shit: function()
        {
            return this.elementAttrs;
        }
    },

    methods: {
        updateElementState(elem) {
            this.elementAttrs = elem;
        },
    },

    updated() {
        
        
        console.log(++this.count);
    }
}
</script>
<style>
.disabled {
    color: #00beff;
    opacity: 0.5;
}
</style>

