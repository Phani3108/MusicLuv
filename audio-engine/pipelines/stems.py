"""Stem separation — lazy wrapper around Demucs.

Invoked from /transcribe to isolate the target instrument stem before running
polyphonic transcription. When demucs isn't installed, returns the full mix.
"""
from __future__ import annotations

import os
import numpy as np


STEM_FOR_INSTRUMENT = {
    "piano": "other",
    "guitar": "other",
    "violin": "other",
    "sitar": "other",
    "flute": "other",
    "bass": "bass",
    "vocals": "vocals",
    "drums": "drums",
    "tabla": "drums",
}


def separate(y: np.ndarray, sr: int, target_stem: str) -> np.ndarray:
    backend = os.getenv("STEMS_BACKEND", "none").lower()

    if backend == "demucs":
        try:
            import torch
            from demucs.apply import apply_model
            from demucs.pretrained import get_model

            model = get_model("htdemucs")
            mix = torch.from_numpy(y).float().unsqueeze(0).unsqueeze(0)
            if mix.shape[1] == 1:
                mix = mix.repeat(1, 2, 1)  # stereo
            sources = apply_model(model, mix, split=True, overlap=0.25)[0]
            # sources shape: [source, channel, time]; source order = model.sources
            src_names = list(model.sources)
            if target_stem in src_names:
                idx = src_names.index(target_stem)
                stem = sources[idx].mean(dim=0).numpy()  # mono
                return stem.astype(np.float32)
        except ImportError:
            pass

    # Fallback: return the original mix untouched
    return y.astype(np.float32)
