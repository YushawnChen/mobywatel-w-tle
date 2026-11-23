# mObywatel „W tle” (“In the background”): clickable prototype

Author: **Yuxiang Chen**

A concept for the **mObywatel Challenge**. Official matters come to where you already are: the lock screen, notifications, the Dynamic Island and widgets. You decide with one tap and Face ID. Anything that needs no decision happens in the background, and you can always undo it.

No login or installation is needed in the browser. The phone works like a real one: you can explore it freely (every app opens), and Ola's story guides you through 9 missions. A mission completes by itself as soon as you reach its goal, whichever way you get there. If you do nothing for a few seconds, a yellow ring on the phone shows what to tap.

## Missions

1. **Morning after the move**: the address updated itself in the vehicle register (CEPiK) and at the tax office, and the European Health Insurance Card (EHIC) was renewed.
2. **New ID card**: order it from a notification, take the photo with the phone, follow a live status, book a pickup time and see your queue number in the Dynamic Island.
3. **A bank asks for data**: see exactly what the bank gets and what it doesn't.
4. **“It wasn’t me”**: block a loan taken out on your PESEL number, with a police report ready to send.
5. **Tax refund**: the tax return is calculated from data the tax office already has, approved with Face ID.
6. **Speed camera**: a notice without a registered letter; name the driver or pay.
7. **Ask the assistant**: questions about travel, deadlines and who has checked your data.
8. **You’re in control**: undo an automatic change or change a rule.
9. **Dad’s phone**: Mr Jerzy, 74, using Assistive Access.

There are also 8 discoveries for people who explore on their own (e.g. the Dynamic Island, Calendar, Notes, Settings).

## Why: the data

The page has a “Dlaczego” (Why) section with four public figures, each linked to its source and to the mission that answers it:

- **38%** of people aged 16–74 did not use a single online public service all year (Statistics Poland (GUS), 2026: 62.1% did).
- **75%** of 7.5 million PESEL freezes were made in the mObywatel app (Ministry of Digital Affairs, December 2025).
- **15,151** loan fraud attempts using someone else's identity were stopped by banks in 2025 (Polish Bank Association and BIK, infoDOK report).
- **22.8%** of people aged 65–74 have at least basic digital skills (Statistics Poland (GUS), 2026).

## Language

The page opens in Polish by default. The **PL / EN** switch (top right; on phones, inside the mission drawer) changes the language of the whole page and the phone without losing progress. Add `?lang=en` to the link to open the English version directly. Translations live in `i18n.js`.

## Technology and data

HTML, CSS and JavaScript with no libraries, API keys or server. The apps on the phone are designed like native iOS apps following Apple's Human Interface Guidelines (`ios.css`), and the page around the phone uses shadcn/ui components (`ui.css`). Read-aloud uses the browser's Web Speech API. All people, companies, documents and amounts are fictional. Signatures, payments and Face ID are simulated, and no data from the prototype is sent anywhere. The page only counts anonymous visits (GoatCounter, no cookies, no personal data). This is an independent concept prototype, not the official mObywatel app.

## Link

https://yushawnchen.github.io/mobywatel-w-tle/ (English: https://yushawnchen.github.io/mobywatel-w-tle/?lang=en)

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` in the repository folder.
