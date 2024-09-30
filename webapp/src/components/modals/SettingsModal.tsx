import React from "react";
import { Scrollable } from "../";
import { AccountTab, AppearanceTab, GeneralTab } from "./SettingsModalTabs";

enum SettingsTabs {
    General,
    Appearance,
    Account,
}

export default function SettingsModal() {
    const [currentTab, setCurrentTab] = React.useState<SettingsTabs>(SettingsTabs.General);

    return (
        <div className="m-auto flex h-[80vh] w-3/4 overflow-hidden rounded-lg border-[1px] border-solid border-[#222] bg-[#080808]">
            <div className="hidden grow basis-1 desktop:block">
                <div>
                    <SelectableTab selected={currentTab === SettingsTabs.General} onClick={() => setCurrentTab(SettingsTabs.General)}>
                        General
                    </SelectableTab>
                    <SelectableTab selected={currentTab === SettingsTabs.Appearance} onClick={() => setCurrentTab(SettingsTabs.Appearance)}>
                        Appearance
                    </SelectableTab>
                    <SelectableTab selected={currentTab === SettingsTabs.Account} onClick={() => setCurrentTab(SettingsTabs.Account)}>
                        Account
                    </SelectableTab>
                </div>
            </div>
            <Scrollable showScroller={false} className="grow-[3] basis-1 px-12 py-4">
                <GeneralTab />
                <AppearanceTab />
                <AccountTab />
            </Scrollable>
        </div>
    );
}

type SelectableTabProps = {
    children: React.ReactNode | string;
    selected: boolean;
    onClick: () => void;
};

function SelectableTab({ children, selected, onClick }: SelectableTabProps) {
    return (
        <button className={`w-full p-2 text-left text-white ${selected ? "bg-[#333]" : ""}`} onClick={onClick}>
            {children}
        </button>
    );
}
