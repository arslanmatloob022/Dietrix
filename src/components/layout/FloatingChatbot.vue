<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import { useLeadStore } from "../../stores/leads";
import UiButton from "../ui/UiButton.vue";

type ChatMessage = {
  id: string;
  from: "bot" | "user";
  text: string;
};

const leadStore = useLeadStore();
const open = ref(false);
const msgContainer = ref<HTMLElement | null>(null);

const messages = ref<ChatMessage[]>([
  {
    id: crypto.randomUUID(),
    from: "bot",
    text: "Hi! I'm your Dietrix Nutrition Assistant 🌿 I can help with diet plans, pricing, PCOS support, and booking. What's your main health goal?",
  },
]);

const lead = reactive({ name: "", email: "", goal: "" });

const quickReplies = [
  "Weight loss plan",
  "PCOS & diabetes support",
  "Pricing details",
  "How to book",
];

function botReply(input: string): string {
  const text = input.toLowerCase();
  if (text.includes("weight")) return "Our Weight Loss Accelerator starts from $149. You get a metabolic assessment, weekly check-ins, and custom meal planning. Most clients see results in 4-6 weeks. Ready to book?";
  if (text.includes("pcos") || text.includes("diabetes") || text.includes("thyroid")) return "Yes! We specialize in Medical Nutrition Therapy for PCOS, diabetes, thyroid, and gut conditions. Our clinical protocols use lab-based adjustments tailored to your biomarkers. Want to book a consultation?";
  if (text.includes("price") || text.includes("cost") || text.includes("pricing")) return "Plans start from $119 (Custom Diet Blueprint) to $249+ for comprehensive medical nutrition therapy. All include personalized meal plans, weekly check-ins, and follow-up support.";
  if (text.includes("book") || text.includes("appointment") || text.includes("slot")) return "You can book directly on our Booking page — choose your date, share your health goal, and we'll personalize your consultation before you even arrive!";
  return "Great question! I can help with nutrition plans, pricing, and booking. You can also fill in your details below and we'll personally reach out with a tailored recommendation.";
}

async function handleQuickReply(reply: string) {
  messages.value.push({ id: crypto.randomUUID(), from: "user", text: reply });
  await nextTick();
  messages.value.push({ id: crypto.randomUUID(), from: "bot", text: botReply(reply) });
  await nextTick();
  if (msgContainer.value) {
    msgContainer.value.scrollTop = msgContainer.value.scrollHeight;
  }
}

async function submitLeadFromChat() {
  await leadStore.captureLead({ name: lead.name, email: lead.email, goal: lead.goal, source: "chatbot" });
  if (!leadStore.error) {
    messages.value.push({ id: crypto.randomUUID(), from: "bot", text: "Thank you! We'll reach out within 24 hours with your personalized nutrition plan recommendation. 🎉" });
    lead.name = ""; lead.email = ""; lead.goal = "";
  }
}
</script>

<template>
  <div class="chatbot-root">
    <Transition name="panel">
      <aside v-if="open" class="chatbot-panel" aria-label="Nutrition AI assistant">
        <!-- Header -->
        <header class="panel-header">
          <div class="bot-avatar" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="10" fill="url(#bh)"/>
              <path d="M7 11c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
              <circle cx="11" cy="7" r="1.2" fill="white"/>
              <defs>
                <linearGradient id="bh" x1="1" y1="1" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#059669"/><stop offset="1" stop-color="#0d9488"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="header-text">
            <h2>Dietrix AI Assistant</h2>
            <p>
              <span class="online-dot" aria-hidden="true"></span>
              Online · Replies in seconds
            </p>
          </div>
          <button class="close-btn" @click="open = false" aria-label="Close assistant">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </header>

        <!-- Messages -->
        <div class="messages" ref="msgContainer" role="log" aria-live="polite">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="['message', `message--${message.from}`]"
          >
            <span v-if="message.from === 'bot'" class="msg-avatar" aria-hidden="true">🌿</span>
            <p>{{ message.text }}</p>
          </div>
        </div>

        <!-- Quick replies -->
        <div class="chips">
          <button
            v-for="reply in quickReplies"
            :key="reply"
            class="chip"
            @click="handleQuickReply(reply)"
          >
            {{ reply }}
          </button>
        </div>

        <!-- Lead capture -->
        <form class="chat-lead" @submit.prevent="submitLeadFromChat" novalidate>
          <p class="lead-heading">Get a personalized callback</p>
          <input v-model="lead.name" placeholder="Your name" autocomplete="name" required />
          <input v-model="lead.email" type="email" placeholder="Email address" autocomplete="email" required />
          <textarea v-model="lead.goal" rows="2" placeholder="Your health goal..." required></textarea>
          <UiButton type="submit" :loading="leadStore.isSubmitting" :full-width="true">
            {{ leadStore.isSubmitting ? "Sending..." : "Get My Plan" }}
          </UiButton>
          <p v-if="leadStore.error" class="msg-error">{{ leadStore.error }}</p>
          <p v-if="leadStore.successMessage" class="msg-success">{{ leadStore.successMessage }}</p>
        </form>
      </aside>
    </Transition>

    <!-- Floating button -->
    <button
      class="chatbot-toggle"
      @click="open = !open"
      :aria-expanded="open"
      aria-label="Open nutrition assistant"
    >
      <span class="toggle-icon" aria-hidden="true">
        <Transition name="icon" mode="out-in">
          <span v-if="!open" key="open">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H7l-4 4V5z" fill="white"/>
            </svg>
          </span>
          <span v-else key="close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </span>
        </Transition>
      </span>
      <span v-if="!open" class="toggle-label">Ask Nutrition AI</span>
    </button>
  </div>
</template>

<style scoped>
.chatbot-root {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 300;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

/* ── Floating toggle ──────────────────────── */
.chatbot-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 99px;
  padding: 12px 20px 12px 16px;
  color: white;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.9rem;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  box-shadow: 0 16px 48px rgba(5, 150, 105, 0.40), 0 4px 12px rgba(5, 150, 105, 0.20);
  cursor: pointer;
  transition: transform 260ms ease, box-shadow 260ms ease;
}
.chatbot-toggle:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 60px rgba(5, 150, 105, 0.48), 0 6px 18px rgba(5, 150, 105, 0.24);
}
.toggle-icon { display: flex; align-items: center; }

/* ── Panel ────────────────────────────────── */
.chatbot-panel {
  width: min(380px, calc(100vw - 32px));
  max-height: min(680px, calc(100vh - 100px));
  overflow: hidden;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  box-shadow:
    0 32px 80px rgba(6, 78, 59, 0.18),
    0 8px 24px rgba(6, 78, 59, 0.10),
    0 0 0 1px rgba(16, 185, 129, 0.08);
  display: flex;
  flex-direction: column;
}

/* ── Header ───────────────────────────────── */
.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  background: linear-gradient(135deg, var(--emerald-900), var(--emerald-700));
  border-radius: 24px 24px 0 0;
}
.bot-avatar {
  width: 42px; height: 42px;
  border-radius: 13px;
  background: rgba(255,255,255,0.15);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.header-text { flex: 1; }
.header-text h2 { color: white; font-size: 1rem; margin-bottom: 2px; }
.header-text p {
  color: rgba(255,255,255,0.72);
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
.online-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #4ade80;
  animation: pulse-dot 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6); }
  50% { box-shadow: 0 0 0 5px rgba(74, 222, 128, 0); }
}
.close-btn {
  background: rgba(255,255,255,0.15);
  border: none;
  border-radius: 8px;
  width: 32px; height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: white;
  transition: background 200ms;
}
.close-btn:hover { background: rgba(255,255,255,0.25); }

/* ── Messages ─────────────────────────────── */
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 220px;
}
.message {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.message p {
  background: var(--emerald-50);
  border: 1px solid rgba(16, 185, 129, 0.12);
  border-radius: 0 14px 14px 14px;
  padding: 10px 14px;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--ink-800);
  max-width: 88%;
}
.message--user { flex-direction: row-reverse; }
.message--user p {
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  color: white;
  border-radius: 14px 0 14px 14px;
  border-color: transparent;
}
.msg-avatar { font-size: 1.1rem; flex-shrink: 0; margin-top: 2px; }

/* ── Chips ────────────────────────────────── */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 14px 12px;
}
.chip {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--emerald-700);
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.22);
  border-radius: 99px;
  padding: 5px 13px;
  cursor: pointer;
  transition: background 200ms, border-color 200ms;
}
.chip:hover { background: rgba(16, 185, 129, 0.16); border-color: rgba(16, 185, 129, 0.4); }

/* ── Lead form ────────────────────────────── */
.chat-lead {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid rgba(16, 185, 129, 0.1);
  background: rgba(246, 250, 250, 0.8);
  border-radius: 0 0 24px 24px;
}
.lead-heading {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-500);
  margin-bottom: 2px;
}
.chat-lead input,
.chat-lead textarea {
  border: 1.5px solid rgba(16, 185, 129, 0.2);
  border-radius: 10px;
  padding: 9px 12px;
  font: inherit;
  font-size: 0.88rem;
  background: white;
  color: var(--ink-900);
  outline: none;
  transition: border-color 220ms;
  resize: none;
}
.chat-lead input:focus,
.chat-lead textarea:focus {
  border-color: var(--emerald-500);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
}
.msg-error { color: #dc2626; font-size: 0.82rem; }
.msg-success { color: var(--emerald-700); font-size: 0.82rem; }

/* ── Panel transition ─────────────────────── */
.panel-enter-active, .panel-leave-active {
  transition: opacity 300ms ease, transform 300ms cubic-bezier(.25,.8,.25,1);
}
.panel-enter-from, .panel-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}

/* ── Icon transition ──────────────────────── */
.icon-enter-active, .icon-leave-active { transition: opacity 180ms, transform 180ms; }
.icon-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.icon-leave-to { opacity: 0; transform: rotate(90deg) scale(0.5); }
</style>
