// Types of views to render from the parent App component

export enum ViewType {
    Draw,
    Settings
}

export enum RecordingStates {
    Idle,
    Recording,
    Loading
}

export function nextRecordingState(state: RecordingStates) {
    switch(state) {
        case RecordingStates.Idle:
            return RecordingStates.Recording;
        case RecordingStates.Recording:
            return RecordingStates.Loading;
        case RecordingStates.Loading:
            return RecordingStates.Idle;
    }
}