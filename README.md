# mObywatel „W tle” – klikalny prototyp

Autor: **Yuxiang Chen**

Koncepcja na **mObywatel Challenge**. Sprawy urzędowe przychodzą tam, gdzie już jesteś: na ekran blokady, do powiadomień, do Dynamic Island i do widżetów. Decydujesz jednym dotknięciem i Face ID. To, co nie wymaga decyzji, dzieje się w tle i można to cofnąć.

W przeglądarce nie trzeba się logować ani niczego instalować. Telefon działa jak prawdziwy: możesz go swobodnie zwiedzać (wszystkie aplikacje da się otworzyć), a historia Oli prowadzi przez 9 misji. Misja zalicza się sama, gdy osiągniesz cel, niezależnie od drogi. Gdy przez kilka sekund nic nie robisz, żółty pierścień w telefonie podpowiada, co dotknąć.

## Misje

1. **Poranek po przeprowadzce** – adres zmienił się sam w CEPiK i urzędzie skarbowym, EKUZ się przedłużyła.
2. **Nowy dowód osobisty** – zamówienie z powiadomienia, zdjęcie telefonem, status na żywo, rezerwacja godziny i numer w kolejce w Dynamic Island.
3. **Bank prosi o dane** – widać, co bank dostanie, a czego nie.
4. **„To nie ja”** – blokada pożyczki na Twój PESEL i gotowe zgłoszenie na policję.
5. **Zwrot podatku** – PIT policzony z danych urzędu, zatwierdzenie Face ID.
6. **Fotoradar** – wezwanie bez listu poleconego: wskazanie kierowcy albo zapłata.
7. **Zapytaj asystenta** – pytania o wyjazd, terminy i to, kto sprawdzał dane.
8. **Masz kontrolę** – cofnięcie automatycznej zmiany albo zmiana zasady.
9. **Telefon taty** – Pan Jerzy, 74 lata, w trybie Dostęp z asystą.

Dodatkowo 8 odkryć dla osób, które zwiedzają same (np. Dynamic Island, Kalendarz, Notatki, Ustawienia).

## Język / Language

Strona domyślnie otwiera się po polsku. Przełącznik **PL / EN** w prawym górnym rogu (na telefonie: w szufladzie misji) zmienia język całej strony i telefonu bez utraty postępu. Link z `?lang=en` otwiera od razu wersję angielską. Tłumaczenia są w pliku `i18n.js`.

The page opens in Polish by default. The **PL / EN** switch (top right; on phones inside the mission drawer) changes the whole page and the phone without losing progress. Add `?lang=en` to the link to open the English version directly.

## Technologia i dane

HTML, CSS i JavaScript bez bibliotek, kluczy API i serwera. Aplikacje w telefonie są zaprojektowane jak natywne aplikacje iOS według Apple Human Interface Guidelines (`ios.css`), a strona wokół telefonu korzysta z komponentów shadcn/ui (`ui.css`). Czytanie na głos korzysta z Web Speech API przeglądarki. Wszystkie osoby, firmy, dokumenty i kwoty są fikcyjne. Podpisy, płatności i Face ID są symulowane i nic nie jest nigdzie wysyłane. Jest to niezależny prototyp koncepcyjny, a nie oficjalna aplikacja mObywatel.

## Link

https://yushawnchen.github.io/mobywatel-w-tle/ (English: https://yushawnchen.github.io/mobywatel-w-tle/?lang=en)

## Uruchomienie lokalnie

Otwórz `index.html` w przeglądarce lub uruchom `python3 -m http.server` w katalogu repozytorium.
