import { atom } from "jotai";

export const lessonPanelAtom   = atom(true);   // open by default in studio
export const mentorPanelAtom   = atom(false);
export const progressPanelAtom = atom(false);
export const questsPanelAtom   = atom(false);
export const libraryPanelAtom  = atom(false);
export const artistPanelAtom   = atom(false);
export const songUploadAtom    = atom(false);
export const gradingModalAtom  = atom(false);
export const dissectionAtom    = atom<string | null>(null); // controlId being dissected
