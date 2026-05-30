"use client";

import { useMemo, useState } from "react";
import type { BriefData, ContactMethod } from "@/types/brief";
import { StepHeader } from "./step-header";

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
      <path d="Mm22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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

function MeetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12.98 22H5.02C4.1 22 3.35 21.25 3.35 20.33V12.5C3.35 11.58 4.1 10.83 5.02 10.83H12.98C13.9 10.83 14.65 11.58 14.65 12.5V20.33C14.65 21.25 13.9 22 12.98 22Z"
        fill="#0066da"
      />
      <path
        d="M12.98 10.83H5.02C4.1 10.83 3.35 11.58 3.35 12.5V14.17H14.65V12.5C14.65 11.58 13.9 10.83 12.98 10.83Z"
        fill="#e82c2a"
      />
      <path d="M14.65 14.17H3.35V16.89H14.65V14.17Z" fill="#f8b62b" />
      <path
        d="M21.43 14.3l-5.11-3.65v11.54l5.11-3.65c.61-.43 1.07-1.12 1.07-1.92v-3.79c-.01-.31-.08-.63-.22-.92-.12-.35-.38-.6-.85-.92z"
        fill="#00832d"
      />
      <path
        d="M14.65 16.89l5.85 4.18c.28.2.62.33.95.33.6 0 1.05-.18 1.45-.6l-8.25-5.91v2Z"
        fill="#00832d"
      />
      <path
        d="M19.53 10.83H22v2.51l-2.47-1.78v-1.9c0-.43-.16-.85-.45-1.18-.28-.31-.69-.47-1.15-.47-.48 0-.91.22-1.2.6l-2.08 1.49v2.1l2.08-1.49c.28-.2.62-.33.95-.33.39 0 .8.17 1.05.6.14.28.22.6.22.91v.94z"
        fill="#f8b62b"
      />
      <path
        d="M20.89 4.38v4.98c0 1.25-1 2.27-2.23 2.27h-4.99V6.65c0-1.25 1-2.27 2.23-2.27h4.99z"
        fill="#00832d"
      />
      <path
        d="M14.65 12.5v7.83c0 .92-.751 1.67-1.67 1.67h-7.96c-.92 0-1.67-.75-1.67-1.67V12.5c0-.92.75-1.67 1.67-1.67h7.96c.92 0 1.67.75 1.67 1.67z"
        fill="#00832d"
      />
    </svg>
  );
}

// Generate the next 14 upcoming weekdays (skipping Fridays 5 and Saturdays 6)
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

// Generate timeslots from 9:00 to 17:00 at 30 min intervals
function generateTimeSlots() {
  const slots: string[] = [];
  for (let h = 9; h <= 16; h++) {
    slots.push(`${h.toLocaleString("en-US", { minimumIntegerDigits: 2 })}:00`);
    slots.push(`${h.toLocaleString("en-US", { minimumIntegerDigits: 2 })}:30`);
  }
  slots.push("17:00");
  return slots;
}

const METHODS: { id: ContactMethod; label: string; icon: React.ReactNode }[] = [
  {
    id: "email",
    label: "Email",
    icon: <MailIcon className="h-5 w-5 text-zinc-600" />,
  },
  {
    id: "phone",
    label: "Phone (Call or WhatsApp)",
    icon: <PhoneIcon className="h-5 w-5 text-zinc-600" />,
  },
  {
    id: "meet",
    label: "Google Meet",
    // Quick simple Google Meet colored SVG
    icon: (
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
    ),
  },
];

export function Step6Meeting({
  data,
  update,
}: {
  data: BriefData;
  update: <K extends keyof BriefData>(k: K, v: BriefData[K]) => void;
}) {
  const days = useMemo(() => getUpcomingWorkdays(14), []);
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  // For managing local UI state of selected day (before selecting time)
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const handleSelectDay = (d: Date) => {
    setSelectedDay(d);
    // Reset the full meetingDate until they pick a time
    update("meetingDate", null);
  };

  const handleSelectTime = (timeInfo: string) => {
    if (!selectedDay) return;
    const [h, m] = timeInfo.split(":");
    const finalDate = new Date(selectedDay);
    finalDate.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
    update("meetingDate", finalDate);
  };

  // Determine if a particular time is selected
  const isTimeSelected = (slot: string) => {
    if (!data.meetingDate || !selectedDay) return false;
    const [h, m] = slot.split(":");
    return (
      data.meetingDate.getFullYear() === selectedDay.getFullYear() &&
      data.meetingDate.getMonth() === selectedDay.getMonth() &&
      data.meetingDate.getDate() === selectedDay.getDate() &&
      data.meetingDate.getHours() === parseInt(h, 10) &&
      data.meetingDate.getMinutes() === parseInt(m, 10)
    );
  };

  return (
    <div>
      <StepHeader
        title="How should we reach out?"
        hint="We mostly prefer calls & meets, but email is fine too."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={data.contactMethod === m.id}
            onClick={() => {
              update("contactMethod", m.id);
              if (m.id !== "meet") update("meetingDate", null);
            }}
            className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl border bg-white/[0.03] p-5 transition hover:border-white/30 hover:bg-white/[0.06] ${
              data.contactMethod === m.id
                ? "border-accent bg-accent/10"
                : "border-white/10"
            }`}
          >
            <div
              className={`rounded-full p-3 transition ${data.contactMethod === m.id ? "bg-white shadow-sm" : "bg-zinc-100 group-hover:bg-white"}`}
            >
              {m.icon}
            </div>
            <span className="text-sm font-semibold text-zinc-900">
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {data.contactMethod === "meet" && (
        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white/50 p-6 shadow-sm ring-1 ring-zinc-900/5">
          <div className="mb-6">
            <h4 className="text-base font-semibold text-zinc-900">
              Select a Date & Time
            </h4>
            <p className="text-sm text-zinc-500">
              Pick an upcoming workday for our initial discovery call.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Days grid */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Upcoming Days
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {days.map((d, i) => {
                  const isSelected =
                    selectedDay?.getFullYear() === d.getFullYear() &&
                    selectedDay?.getMonth() === d.getMonth() &&
                    selectedDay?.getDate() === d.getDate();

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectDay(d)}
                      className={`flex flex-col items-center rounded-xl border p-3 transition-colors ${
                        isSelected
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-zinc-200 bg-white text-zinc-700 hover:border-accent/40 hover:bg-zinc-50"
                      }`}
                    >
                      <span className="text-xs uppercase opacity-70">
                        {d.toLocaleString("en-US", { weekday: "short" })}
                      </span>
                      <span className="text-lg font-bold">{d.getDate()}</span>
                      <span className="text-xs uppercase opacity-70">
                        {d.toLocaleString("en-US", { month: "short" })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Time slots (only show if day is selected) */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {selectedDay ? "Available Times (Riyadh)" : " "}
                </span>
              </div>

              {!selectedDay ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 text-center">
                  <span className="text-sm text-zinc-400">
                    Select a day first
                  </span>
                </div>
              ) : (
                <div className="grid h-[320px] grid-cols-2 gap-2 overflow-y-auto pr-2 sm:grid-cols-3 lg:grid-cols-2">
                  {timeSlots.map((slot) => {
                    const selected = isTimeSelected(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSelectTime(slot)}
                        className={`h-11 rounded-lg border font-medium transition-colors ${
                          selected
                            ? "border-accent bg-accent text-white shadow-md shadow-accent/20"
                            : "border-zinc-200 bg-white text-zinc-700 hover:border-accent hover:text-accent"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
