diff --git a/BetterConversationsAPI/README.md b/BetterConversationsAPI/README.md
new file mode 100644
index 0000000000000000000000000000000000000000..7cfb8abfc71c19ea3d00fb6a47373d5bc10a4d9c
--- /dev/null
+++ b/BetterConversationsAPI/README.md
@@ -0,0 +1,35 @@
+# Better Conversations API
+
+A playful mock API spec presented as a static webpage. Each card is a one-player practice prompt: flip a skill, try it in your
+next conversation, and reflect on the response—no competition needed. Bonus cards nod to TED speakers and thought leaders—Jia
+Jiang’s courage in “100 Days of Rejection,” Celeste Headlee’s “10 Ways to Have a Better Conversation,” Simon Sinek’s listening
+insights, and Larry King’s reminder that learning starts with listening—so the solo practice feels like a conversation with
+mentors.
+
+Example bonus cards:
+- 🎤 Jia Jiang — `/embraceRejection`
+  - Challenge: Ask for something you expect to be refused.
+  - Win Condition: You survive the “no” and learn something new.
+  - Bonus XP: You get a “yes” when you least expect it.
+- 🎤 Celeste Headlee — `/10Ways`
+  - Challenge: Pick one of her 10 tips (like “don’t multitask” or “don’t pontificate”) and apply it.
+  - Win Condition: The conversation feels smoother.
+  - Bonus XP: You notice the other person leaning in.
+- 🎤 Simon Sinek — `/artOfListening`
+  - Challenge: Ask a follow-up that proves you truly heard.
+  - Win Condition: The other person expands their thought.
+  - Bonus XP: They say “that’s a good question.”
+- 🎤 Larry King — `/dailyReminder`
+  - Challenge: Start your day with his mantra: “If I’m going to learn, I must do it by listening.”
+  - Win Condition: You catch yourself listening more than talking.
+  - Bonus XP: You discover something you didn’t expect.
+
+## Run locally
+1. From the repo root, start a simple web server on port **8080**:
+   ```bash
+   python -m http.server 8080
+   ```
+2. Open the page in your browser at [http://localhost:8080/BetterConversationsAPI/](http://localhost:8080/BetterConversationsAPI/).
+3. Stop the server with `Ctrl+C` when you’re done.
+
+The page is plain HTML/CSS only—no build step required.
