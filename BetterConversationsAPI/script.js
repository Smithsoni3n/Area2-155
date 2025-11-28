diff --git a/BetterConversationsAPI/script.js b/BetterConversationsAPI/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..7bb218fb1c698675ff0c532483c13997ebe54735
--- /dev/null
+++ b/BetterConversationsAPI/script.js
@@ -0,0 +1,15 @@
+document.addEventListener('DOMContentLoaded', () => {
+    const flipCards = document.querySelectorAll('.flip-card');
+
+    flipCards.forEach((card) => {
+        const toggle = () => card.classList.toggle('flipped');
+
+        card.addEventListener('click', toggle);
+        card.addEventListener('keydown', (event) => {
+            if (event.key === 'Enter' || event.key === ' ') {
+                event.preventDefault();
+                toggle();
+            }
+        });
+    });
+});
