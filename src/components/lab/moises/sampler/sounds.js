import * as Tone from "tone";

// Effects Chain
const padReverb = new Tone.Reverb({ decay: 4, wet: 0.4 }).toDestination();
const padFilter = new Tone.Filter(900, "lowpass").connect(padReverb);
const padChorus = new Tone.Chorus({
  frequency: 1.5,
  delayTime: 3.5,
  depth: 0.7,
})
  .connect(padFilter)
  .start();

// Polyphonic Synth
const pad = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "fatsawtooth", count: 3, spread: 25 },
  envelope: {
    attack: 0.35,
    decay: 0.8,
    sustain: 0.6,
    release: 1.2,
  },
}).connect(padChorus);

const kick = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 6,
  oscillator: { type: "sine" },
  envelope: {
    attack: 0.001,
    decay: 0.35,
    sustain: 0.01,
    release: 0.4,
  },
}).toDestination();

const bass = new Tone.FMSynth({
  harmonicity: 1,
  modulationIndex: 3.5,
  oscillator: { type: "triangle" },
  envelope: {
    attack: 0.005,
    decay: 0.2,
    sustain: 0.1,
    release: 0.25,
  },
  modulation: { type: "square" },
  modulationEnvelope: {
    attack: 0.005,
    decay: 0.15,
    sustain: 0.01,
    release: 0.2,
  },
}).toDestination();

const clapFilter = new Tone.Filter({
  frequency: 1100,
  type: "bandpass",
  Q: 1.2,
}).toDestination();

const clap = new Tone.NoiseSynth({
  noise: { type: "white" },
  envelope: {
    attack: 0.005,
    decay: 0.18,
    sustain: 0,
    release: 0.1,
  },
}).connect(clapFilter);

export function playSound(soundType) {
  const time = Tone.now();

  switch (soundType) {
    case "kick":
      kick.triggerAttackRelease("C1", "8n", time);
      break;
    case "bass":
      bass.triggerAttackRelease("F3", "8n", time);
      break;
    case "pad":
      pad.triggerAttackRelease(["C3", "Eb3", "G3", "Bb3"], "8n", time);
      break;
    case "clap":
      clap.triggerAttackRelease("16n", time);
      break;
  }
}
