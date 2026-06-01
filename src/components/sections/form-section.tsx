"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { DirectionalArrow } from "@/components/icons/directional-arrow";
import { StepHeader } from "@/components/brief-wizard/step-header";
import { WizardNav } from "@/components/brief-wizard/wizard-nav";
import { WizardProgress } from "@/components/brief-wizard/wizard-progress";
import type { ContactFormData } from "@/lib/contact-form";
import { useDictionary } from "@/i18n/locale-provider";
import {
  attributionPayload,
  trackFormStart,
  trackLead,
} from "@/lib/marketing/track";

const initialForm: ContactFormData = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  industry: "",
  campaignType: "",
  targetCities: "",
  campaignDate: "",
  budget: "",
  notes: "",
  contactMethod: "",
  meetingDate: "",
};

const inputCls =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent";
const labelCls = "text-sm font-semibold text-zinc-900";
const hintCls = "text-xs text-zinc-500";

function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className={labelCls}>{label}</label>
      {hint && <span className={hintCls}>{hint}</span>}
      {children}
    </div>
  );
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
          isOpen
            ? "border-accent bg-white ring-1 ring-accent"
            : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/80"
        } ${value ? "text-zinc-900" : "text-zinc-500"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] outline-none"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 text-start text-sm transition-colors ${
                  value === opt
                    ? "bg-accent/5 font-semibold text-accent"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                {opt}
                {value === opt && (
                  <svg
                    className="ml-auto h-4 w-4 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DateRangePicker({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleDateClick = (day: number) => {
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    if (!start || (start && end)) {
      setStart(selected);
      setEnd(null);
    } else if (selected < start) {
      setStart(selected);
      setEnd(null);
    } else {
      setEnd(selected);
      const fmt = (d: Date) =>
        d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      onChange(`From ${fmt(start)} To ${fmt(selected)}`);
      setIsOpen(false);
    }
  };

  const isSelected = (day: number) => {
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    if (start && d.getTime() === start.getTime()) return true;
    if (end && d.getTime() === end.getTime()) return true;
    return false;
  };

  const isInRange = (day: number) => {
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    if (start && end) {
      return d > start && d < end;
    }
    if (start && hoveredDate && !end) {
      const s = start < hoveredDate ? start : hoveredDate;
      const h = start < hoveredDate ? hoveredDate : start;
      return d > s && d < h;
    }
    return false;
  };

  const isHovered = (day: number) => {
    if (!start || end) return false;
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return hoveredDate && d.getTime() === hoveredDate.getTime();
  };

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
          isOpen
            ? "border-accent bg-white ring-1 ring-accent"
            : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/80"
        } ${value ? "text-zinc-900" : "text-zinc-500"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          className="h-4 w-4 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute bottom-full left-0 right-0 z-50 mb-2 rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl md:right-auto md:w-72"
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 hover:text-accent"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h4 className="text-xs font-bold text-zinc-900">
                {currentMonth.toLocaleDateString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h4>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 hover:text-accent"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-[9px] font-bold uppercase tracking-widest text-zinc-400">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-0.5">
              {Array.from({ length: firstDayOfMonth(currentMonth) }).map(
                (_, i) => (
                  <div key={`empty-${i}`} />
                ),
              )}
              {Array.from({ length: daysInMonth(currentMonth) }).map((_, i) => {
                const day = i + 1;
                const selected = isSelected(day);
                const ranged = isInRange(day);
                const hovered = isHovered(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onMouseEnter={() =>
                      setHoveredDate(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          day,
                        ),
                      )
                    }
                    onMouseLeave={() => setHoveredDate(null)}
                    onClick={() => handleDateClick(day)}
                    className={`relative flex aspect-square items-center justify-center rounded-lg text-xs transition-colors ${
                      selected
                        ? "bg-accent text-white"
                        : ranged
                          ? "bg-accent/10 text-accent"
                          : hovered
                            ? "bg-zinc-100 text-accent ring-1 ring-accent/30"
                            : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 px-1 text-[9px] uppercase tracking-widest">
              <span className="font-bold text-accent">
                {!start ? "Pick Start" : !end ? "Pick End" : "Range Set"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setStart(null);
                  setEnd(null);
                  onChange("");
                }}
                className="text-zinc-400 hover:text-zinc-600"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function getUpcomingWorkdays(count: number) {
  const days: Date[] = [];
  let d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const w = d.getDay();
    if (w !== 5 && w !== 6) {
      days.push(new Date(d));
    }
  }
  return days;
}

function generateTimeSlots() {
  const slots: string[] = [];
  for (let h = 9; h <= 16; h++) {
    slots.push(`${h.toLocaleString("en-US", { minimumIntegerDigits: 2 })}:00`);
    slots.push(`${h.toLocaleString("en-US", { minimumIntegerDigits: 2 })}:30`);
  }
  slots.push("17:00");
  return slots;
}

function SingleDatePicker({
  value,
  onChange,
  placeholder,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleDateClick = (day: number) => {
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    onChange(selected);
    setIsOpen(false);
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return d.getTime() === value.getTime();
  };

  // Disable weekends & past dates
  const isAvailable = (day: number) => {
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const w = d.getDay();
    if (w === 5 || w === 6) return false;
    return d >= today;
  };

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );

  const displayVal = value
    ? value.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
          isOpen
            ? "border-accent bg-white ring-1 ring-accent"
            : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/80"
        } ${value ? "text-zinc-900 font-semibold" : "text-zinc-500"}`}
      >
        <span className="truncate">{displayVal || placeholder}</span>
        <svg
          className="h-4 w-4 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute bottom-full left-0 right-0 z-50 mb-2 rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl md:right-auto md:w-72"
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 hover:text-accent"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h4 className="text-xs font-bold text-zinc-900">
                {currentMonth.toLocaleDateString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h4>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 hover:text-accent"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-[9px] font-bold uppercase tracking-widest text-zinc-400">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-0.5">
              {Array.from({ length: firstDayOfMonth(currentMonth) }).map(
                (_, i) => (
                  <div key={`empty-${i}`} />
                ),
              )}
              {Array.from({ length: daysInMonth(currentMonth) }).map((_, i) => {
                const day = i + 1;
                const selected = isSelected(day);
                const available = isAvailable(day);
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={!available}
                    onClick={() => handleDateClick(day)}
                    className={`relative flex aspect-square items-center justify-center rounded-lg text-xs transition-colors ${
                      selected
                        ? "bg-accent text-white"
                        : available
                          ? "text-zinc-700 hover:bg-zinc-50 hover:text-accent"
                          : "text-zinc-300 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FormSection() {
  const dict = useDictionary();
  const c = dict.contact;
  const TOTAL_STEPS = c.steps.length;

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ContactFormData>(initialForm);

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [timeHour, setTimeHour] = useState(9); // 9 to 17
  const [timeMinute, setTimeMinute] = useState(0);

  const update = <K extends keyof ContactFormData>(
    key: K,
    value: ContactFormData[K],
  ) => setData((d) => ({ ...d, [key]: value }));

  // Effect to sync meetingDate
  useEffect(() => {
    if (selectedDay) {
      const displayH = timeHour > 12 ? timeHour - 12 : timeHour;
      const hStr = displayH.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      });
      const mStr = timeMinute.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      });
      const period = timeHour >= 12 ? "PM" : "AM";
      const dStr = selectedDay.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      update("meetingDate", `${dStr} at ${hStr}:${mStr} ${period}`);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      update("meetingDate", "");
    }
  }, [selectedDay, timeHour, timeMinute]);

  const firstStepComplete =
    data.name.trim().length > 0 &&
    data.company.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(data.email) &&
    data.whatsapp.trim().length > 0;
  const lastStepComplete =
    data.contactMethod.length > 0 &&
    (data.contactMethod !== "meet" || data.meetingDate!.length > 0);
  const canAdvance =
    step === 0
      ? firstStepComplete
      : step === TOTAL_STEPS - 1
        ? lastStepComplete
        : true;
  const isOptionalStep = step > 0 && step < TOTAL_STEPS - 1;

  const handleSubmit = async () => {
    if (!lastStepComplete) return;

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const payload: ContactFormData = {
        ...data,
        attribution: attributionPayload(),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(body.error ?? c.error);
      }
      trackLead({
        campaign_type: data.campaignType,
        industry: data.industry,
        budget: data.budget || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : c.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const successBody = c.successBody.replace(
    "{name}",
    data.name ? `، ${data.name.split(" ")[0]}` : "",
  );

  return (
    <section
      id="contact"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-white py-24 md:py-32"
    >
      <div
        className="grid-floor pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <Reveal className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {c.eyebrow}
            </p>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            {c.headline1}
            <br />
            <span className="text-accent">{c.headlineAccent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-zinc-600">{c.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative rounded-[2rem] bg-white p-8 shadow-xl shadow-accent/5 ring-1 ring-accent/10 md:p-12">
            {submitted ? (
              <div className="flex flex-col items-center py-20 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <DirectionalArrow className="h-10 w-10 rotate-90" />
                </div>
                <h3 className="text-3xl font-bold text-zinc-900">
                  {c.successTitle}
                </h3>
                <p className="mt-4 text-zinc-600">{successBody}</p>
              </div>
            ) : (
              <div className="grid gap-8">
                <WizardProgress
                  current={step}
                  total={TOTAL_STEPS}
                  labels={c.steps}
                />

                <div className="min-h-[280px]">
                  {step === 0 && (
                    <div>
                      <StepHeader title={c.step0.title} hint={c.step0.hint} />
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label={c.step0.name}>
                          <input
                            required
                            type="text"
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => update("name", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label={c.step0.company}>
                          <input
                            required
                            type="text"
                            autoComplete="organization"
                            value={data.company}
                            onChange={(e) => update("company", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label={c.step0.email}>
                          <input
                            required
                            type="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label={c.step0.whatsapp}>
                          <input
                            required
                            type="tel"
                            autoComplete="tel"
                            value={data.whatsapp}
                            onChange={(e) => update("whatsapp", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <StepHeader title={c.step1.title} hint={c.step1.hint} />
                      <Field
                        label={c.step1.industry}
                        hint={c.step1.industryHint}
                      >
                        <CustomSelect
                          value={data.industry}
                          onChange={(val) => update("industry", val)}
                          options={c.step1.industries}
                          placeholder={c.step1.choose}
                        />
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <StepHeader title={c.step2.title} hint={c.step2.hint} />
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field
                          label={c.step2.type}
                          hint={c.step2.typeHint}
                          className="md:col-span-2"
                        >
                          <CustomSelect
                            value={data.campaignType}
                            onChange={(val) => update("campaignType", val)}
                            options={c.step2.campaignTypes}
                            placeholder={c.step1.choose}
                          />
                        </Field>
                        <Field
                          label={c.step2.cities}
                          hint={c.step2.citiesHint}
                          className="md:col-span-2"
                        >
                          <CustomSelect
                            value={data.targetCities}
                            onChange={(val) => update("targetCities", val)}
                            options={c.step2.cityOptions}
                            placeholder={c.step1.choose}
                          />
                        </Field>
                        <Field label={c.step2.date}>
                          <DateRangePicker
                            value={data.campaignDate}
                            onChange={(val) => update("campaignDate", val)}
                            placeholder={c.step2.datePlaceholder}
                          />
                        </Field>
                        <Field label={c.step2.budget}>
                          <CustomSelect
                            value={data.budget}
                            onChange={(val) => update("budget", val)}
                            options={c.step2.budgetOptions}
                            placeholder={c.step1.choose}
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <StepHeader title={c.step3.title} hint={c.step3.hint} />
                      <Field label={c.step3.notes}>
                        <textarea
                          rows={5}
                          value={data.notes}
                          onChange={(e) => update("notes", e.target.value)}
                          placeholder={c.step3.notesPlaceholder}
                          className={inputCls}
                        />
                      </Field>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <StepHeader
                        title={c.step4.title}
                        hint={c.step4.hint}
                      />
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {/* Email */}
                        <button
                          type="button"
                          onClick={() => {
                            update("contactMethod", "email");
                            update("meetingDate", "");
                          }}
                          className={`group relative flex text-left sm:text-center sm:flex-col items-center sm:justify-center gap-4 sm:gap-3 rounded-2xl border bg-white/[0.03] p-4 sm:p-5 transition ${
                            data.contactMethod === "email"
                              ? "border-accent bg-accent/5 ring-1 ring-accent"
                              : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                          }`}
                        >
                          <div
                            className={`rounded-xl p-3 transition ${data.contactMethod === "email" ? "bg-accent/10" : "bg-white shadow-sm"}`}
                          >
                            <MailIcon
                              className={`h-5 w-5 ${data.contactMethod === "email" ? "text-accent" : "text-zinc-600"}`}
                            />
                          </div>
                          <span className="text-xs font-semibold text-zinc-900">
                            {c.step4.methodEmail}
                          </span>
                        </button>

                        {/* Phone */}
                        <button
                          type="button"
                          onClick={() => {
                            update("contactMethod", "phone");
                            update("meetingDate", "");
                          }}
                          className={`group relative flex text-left sm:text-center sm:flex-col items-center sm:justify-center gap-4 sm:gap-3 rounded-2xl border bg-white/[0.03] p-4 sm:p-5 transition ${
                            data.contactMethod === "phone"
                              ? "border-accent bg-accent/5 ring-1 ring-accent"
                              : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                          }`}
                        >
                          <div
                            className={`rounded-xl p-3 transition ${data.contactMethod === "phone" ? "bg-accent/10" : "bg-white shadow-sm"}`}
                          >
                            <PhoneIcon
                              className={`h-5 w-5 ${data.contactMethod === "phone" ? "text-accent" : "text-zinc-600"}`}
                            />
                          </div>
                          <span className="text-xs font-semibold text-zinc-900">
                            {c.step4.methodPhone}
                          </span>
                        </button>

                        {/* Meet */}
                        <button
                          type="button"
                          onClick={() => update("contactMethod", "meet")}
                          className={`group relative flex text-left sm:text-center sm:flex-col items-center sm:justify-center gap-4 sm:gap-3 rounded-2xl border bg-white/[0.03] p-4 sm:p-5 transition ${
                            data.contactMethod === "meet"
                              ? "border-accent bg-accent/5 ring-1 ring-accent"
                              : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                          }`}
                        >
                          <div
                            className={`rounded-xl p-3 transition ${data.contactMethod === "meet" ? "bg-accent/10" : "bg-white shadow-sm"}`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21 5.5l-4.5 3.5v6l4.5 3.5c.7.5 1.5.1 1.5-.8V6.3c0-.9-.8-1.3-1.5-.8z"
                                fill="#00832d"
                              />
                              <path
                                d="M4 19h3v-5l5-4V4H5C3.3 4 2 5.3 2 7v9.5c0 1.4 1.1 2.5 2 2.5z"
                                fill="#0066da"
                              />
                              <path d="M16 19h-9v-5l5-4v9z" fill="#f8b62b" />
                              <path d="M16 4h-4v6l5 4V4z" fill="#e82c2a" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-zinc-900">
                            {c.step4.methodMeet}
                          </span>
                        </button>
                      </div>

                      {data.contactMethod === "meet" && (
                        <div className="mt-6 rounded-3xl border border-zinc-200 bg-zinc-50/50 p-4 sm:p-6 shadow-sm">
                          <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm font-semibold text-zinc-900">
                              {c.step4.pickDateTime}
                            </p>
                          </div>

                          <div className="grid gap-6">
                            <div>
                              <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                {c.step4.dateLabel}
                              </label>
                              <SingleDatePicker
                                value={selectedDay}
                                onChange={setSelectedDay}
                                placeholder={c.step4.datePlaceholder}
                              />
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                              <div className="flex flex-1 items-center gap-2 sm:gap-3">
                                <div className="flex-1">
                                  <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    <svg
                                      className="h-4 w-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    {c.step4.hourLabel}
                                  </label>
                                  <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-2 py-2 sm:px-3 shadow-sm">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setTimeHour((h) =>
                                          h <= 9 ? 17 : h - 1,
                                        )
                                      }
                                      className="p-1 text-zinc-400 hover:text-accent"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </button>
                                    <span className="w-12 text-center text-lg font-bold text-zinc-900">
                                      {(timeHour > 12
                                        ? timeHour - 12
                                        : timeHour
                                      ).toLocaleString("en-US", {
                                        minimumIntegerDigits: 2,
                                      })}
                                      <span className="text-[10px] font-normal text-zinc-500 ml-1">
                                        {timeHour >= 12 ? "PM" : "AM"}
                                      </span>
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setTimeHour((h) => {
                                          const next = h >= 17 ? 9 : h + 1;
                                          if (next === 17) setTimeMinute(0);
                                          return next;
                                        })
                                      }
                                      className="p-1 text-zinc-400 hover:text-accent"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 15l7-7 7 7"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>

                                <span className="mt-6 text-xl font-bold text-zinc-300">
                                  :
                                </span>

                                <div className="flex-1">
                                  <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    <svg
                                      className="h-4 w-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    {c.step4.minuteLabel}
                                  </label>
                                  <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-2 py-2 sm:px-3 shadow-sm">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setTimeMinute((m) => {
                                          if (timeHour === 17) return 0;
                                          return m === 0 ? 30 : 0;
                                        })
                                      }
                                      className="p-1 text-zinc-400 hover:text-accent"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </button>
                                    <span className="w-8 text-center text-lg font-bold text-zinc-900">
                                      {timeMinute.toLocaleString("en-US", {
                                        minimumIntegerDigits: 2,
                                      })}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setTimeMinute((m) => {
                                          if (timeHour === 17) return 0;
                                          return m === 30 ? 0 : 30;
                                        })
                                      }
                                      className="p-1 text-zinc-400 hover:text-accent"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 15l7-7 7 7"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {submitError && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                )}

                <WizardNav
                  step={step}
                  totalSteps={TOTAL_STEPS}
                  canAdvance={canAdvance}
                  isSubmitting={isSubmitting}
                  onPrev={() => setStep((s) => Math.max(0, s - 1))}
                  onNext={() => {
                    if (step === 0) trackFormStart();
                    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
                  }}
                  onSubmit={handleSubmit}
                  submitLabel={c.submit}
                  nextLabel={isOptionalStep ? c.skip : c.continue}
                />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
