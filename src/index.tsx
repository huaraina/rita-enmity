import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React, Toasts } from 'enmity/metro/common';
import { create } from 'enmity/patcher';
import { getIDByName } from 'enmity/api/assets';
import manifest from '../manifest.json';
import { getByProps } from 'enmity/metro';

import Settings from './components/Settings';

const desiredChannel:string = "1135434532082962493";

const Patcher = create('RitaPlug');

const RitaPlug: Plugin = {
    ...manifest,

    onStart() {
        let signal = false;
        setInterval(() => {
            let currentChannelId = getByProps('getLastSelectedChannelId').getChannelId();;
            if (currentChannelId === desiredChannel && !signal) {
                Toasts.open({
                    key: "TOAST",
                    content: `Wow... Rita Toast`,
                    icon: getIDByName('Check')
                });
                signal = true;
            } else if (currentChannelId === desiredChannel && signal) {
                signal = true;
            } else {
                signal = false;
            }
        }, 300);
    },
    onStop() {
        Patcher.unpatchAll();
    },
    getSettingsPanel({ settings }) {
        return <Settings settings={settings} />
    },
}

registerPlugin(RitaPlug);