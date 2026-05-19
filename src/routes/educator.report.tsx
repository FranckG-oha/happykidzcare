import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mic, Square, Play, Pause, Send, Trash2, Languages, Loader2 } from "lucide-react";
import { children } from "@/lib/mock";

export const Route = createFileRoute("/educator/report")({
  head: () => ({
    meta: [
      { title: "Voice daily report — Educator" },
      { name: "description", content: "Record a voice note for the daily report. Speech is transcribed in real time." },
    ],
  }),
  component: EducatorReportPage,
});

// Minimal typing for Web Speech API
type SR = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognition(): (new () => SR) | null {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

const LANGS = [
  { code: "fr-FR", label: "Français" },
  { code: "en-US", label: "English" },
  { code: "es-ES", label: "Español" },
  { code: "ar-SA", label: "العربية" },
];

function EducatorReportPage() {
  const [childId, setChildId] = useState(children[0].id);
  const [lang, setLang] = useState("fr-FR");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [finalText, setFinalText] = useState("");
  const [interim, setInterim] = useState("");
  const [sent, setSent] = useState(false);
  const [supportError, setSupportError] = useState<string | null>(null);

  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const srRef = useRef<SR | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      try { srRef.current?.stop(); } catch { /* noop */ }
      try { mediaRef.current?.stop(); } catch { /* noop */ }
    };
  }, []);

  const start = async () => {
    setSupportError(null);
    setAudioUrl(null);
    setFinalText("");
    setInterim("");
    setSent(false);
    setSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      mediaRef.current = rec;

      // Live transcription via Web Speech API (browser-native, on-device on Chrome/Edge/Safari)
      const SRClass = getSpeechRecognition();
      if (SRClass) {
        const sr = new SRClass();
        sr.continuous = true;
        sr.interimResults = true;
        sr.lang = lang;
        sr.onresult = (e: any) => {
          let interimAcc = "";
          let finalAcc = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const t = e.results[i][0].transcript;
            if (e.results[i].isFinal) finalAcc += t + " ";
            else interimAcc += t;
          }
          if (finalAcc) setFinalText((prev) => (prev + finalAcc).replace(/\s+/g, " "));
          setInterim(interimAcc);
        };
        sr.onerror = (ev: any) => {
          if (ev?.error && ev.error !== "no-speech") {
            setSupportError(`Speech recognition error: ${ev.error}`);
          }
        };
        sr.onend = () => { /* may end mid-record; we restart only while recording */
          if (mediaRef.current && mediaRef.current.state === "recording") {
            try { sr.start(); } catch { /* noop */ }
          }
        };
        try { sr.start(); } catch { /* noop */ }
        srRef.current = sr;
      } else {
        setSupportError("Live transcription not supported in this browser. The audio will still be recorded — transcription will run after upload.");
      }

      setRecording(true);
      timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (err: any) {
      setSupportError(err?.message || "Microphone access denied.");
    }
  };

  const stop = () => {
    try { mediaRef.current?.stop(); } catch { /* noop */ }
    try { srRef.current?.stop(); } catch { /* noop */ }
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    setRecording(false);
    setInterim("");
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); } else { a.play(); setPlaying(true); }
  };

  const reset = () => {
    setAudioUrl(null);
    setFinalText("");
    setInterim("");
    setSeconds(0);
    setSent(false);
  };

  const send = () => {
    // Mock: in production, upload Blob + transcript to backend
    setSent(true);
  };

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const activeChild = children.find((c) => c.id === childId)!;
  const transcriptDisplay = (finalText + " " + interim).trim();

  return (
    <main className="min-h-svh bg-background pb-10">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-6">
        <Link to="/children" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Educator · Voice report</p>
        <div className="w-10" />
      </header>

      <h1 className="mx-6 mt-4 font-display text-2xl font-bold leading-tight text-foreground">
        Record today's report
      </h1>
      <p className="mx-6 mt-1 text-sm text-muted-foreground">
        Speak naturally — your words are transcribed live and saved to the parent's daily report.
      </p>

      {/* Child + language */}
      <section className="mx-6 mt-5 space-y-3">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Child</p>
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {children.map((c) => {
              const sel = c.id === childId;
              return (
                <button
                  key={c.id}
                  onClick={() => setChildId(c.id)}
                  disabled={recording}
                  className={`shrink-0 rounded-2xl px-3 py-2 text-sm font-semibold transition-colors ${
                    sel ? "bg-primary text-primary-foreground" : "bg-surface-low text-foreground"
                  } ${recording ? "opacity-50" : ""}`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <Languages className="h-3 w-3" /> Language
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGS.map((l) => {
              const sel = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  disabled={recording}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    sel ? "bg-primary-container text-primary" : "bg-surface-low text-muted-foreground"
                  } ${recording ? "opacity-50" : ""}`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recorder */}
      <section className="mx-6 mt-6 rounded-[1.75rem] bg-card p-6 text-center" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
          {recording && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full bg-destructive/25"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <motion.span
                className="absolute inset-2 rounded-full bg-destructive/30"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: 0.3 }}
              />
            </>
          )}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={recording ? stop : start}
            className={`relative flex h-24 w-24 items-center justify-center rounded-full text-primary-foreground ${
              recording ? "bg-destructive" : "bg-primary"
            }`}
            aria-label={recording ? "Stop recording" : "Start recording"}
          >
            {recording ? <Square className="h-7 w-7" /> : <Mic className="h-8 w-8" />}
          </motion.button>
        </div>

        <p className="mt-4 font-display text-xl font-bold tabular-nums text-foreground">{mmss}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {recording ? "Recording… tap to stop" : audioUrl ? "Tap mic to re-record" : `Tap to start recording for ${activeChild.name}`}
        </p>
      </section>

      {/* Live transcript */}
      <section className="mx-6 mt-4 rounded-[1.5rem] bg-surface-low p-4 min-h-[120px]">
        <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          <Loader2 className={`h-3 w-3 ${recording ? "animate-spin" : ""}`} /> Live transcription
        </p>
        {transcriptDisplay ? (
          <p className="text-sm leading-relaxed text-foreground">
            {finalText}
            <span className="text-muted-foreground">{interim}</span>
          </p>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            {recording ? "Listening…" : "Your transcription will appear here as you speak."}
          </p>
        )}
      </section>

      {supportError && (
        <p className="mx-6 mt-3 rounded-2xl bg-warning/20 px-4 py-2.5 text-xs text-warning-foreground">{supportError}</p>
      )}

      {/* Playback + actions */}
      <AnimatePresence>
        {audioUrl && !recording && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-6 mt-4 rounded-[1.5rem] bg-card p-4"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} />
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
              </motion.button>
              <div className="flex-1 text-sm font-semibold text-foreground">Preview recording</div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={reset}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-muted-foreground"
                aria-label="Discard"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={send}
              disabled={sent}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {sent ? `Sent to ${activeChild.name}'s parents` : `Send to ${activeChild.name}'s daily report`}
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
