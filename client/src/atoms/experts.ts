import { atom } from "jotai";

/** Expert Library panel open/focused expert id. */
export const expertLibraryPanelAtom = atom<boolean>(false);

/** Currently focused expert (for detail modal). null = list view. */
export const focusedExpertAtom = atom<string | null>(null);

/** Currently focused masterclass (for playback modal). */
export const focusedMasterclassAtom = atom<string | null>(null);

/** When the learner books a live session, hold the slot id here so the
 *  booking confirmation modal can render. */
export const bookingLiveSlotAtom = atom<string | null>(null);
