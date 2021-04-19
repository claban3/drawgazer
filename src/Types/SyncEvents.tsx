import { SelectedAnimation } from "./Figures";

export enum SyncEvents {
    SetFigures,
    SetAnimations,
    AddFigure,
    DeleteFigure,
}

export interface SyncEvent  {
    srcId: string;
    destId: string;
    eventType: SyncEvents; 
    figs?: string[],
    animations?: SelectedAnimation[];
    selectedAnimation?: SelectedAnimation;

}

export interface SyncInfo {
    synced: boolean,
    uniqueId: string,
    syncedWith: string,
    syncEvents: SyncEvent[],
    popSyncEvent: () => void;
}