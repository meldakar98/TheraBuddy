# Zeitplan
Unser Zeitplan erstreckte sich über 12 Wochen und gliederte sich in 6 Schritte.

In den ersten beiden Wochen haben wir Forschung und Vorbereitung betrieben. Es war wichtig, das Ziel unseres Projekts zu definieren, welche Funktionen es bieten würde, und die Auswahl des Basismodells sowie einer geeigneten Validierungsmethode zu recherchieren.

In der dritten Woche lag unser Fokus auf der Erstellung des theoretischen Modells. Dies beinhaltete die Entwicklung eines Prototyps und die Planung technischer Entwicklungen.

In den vierten und fünften Wochen begannen wir mit der Umsetzung dieser Entwürfe. Diese Phase dauerte jedoch länger als geplant, da unser Modell mehrere Trainings- und Verbesserungsphasen benötigte. Am Ende dieses Schrittes beschlossen wir, dass wir genügend Zeit und Ressourcen hatten, um eine eigene grafische Benutzeroberfläche zu implementieren, anstatt dass die Interaktion mit dem Modell nur über die Befehlszeile möglich war.

In den Wochen sechs bis sieben widmeten wir uns der Validierungsphase. Wir testeten das Modell und verglichen es mit anderen Modellen. Dabei maßen wir die Leistung und erkannten potenzielle Verbesserungsmöglichkeiten.

Am Ende unseres Projekts beschäftigten wir uns mit der Finalisierung der Benutzeroberfläche und der Vorstellung des Endprodukts.

# TheraBuddy

Dieses Chat-Tool wurde entwickelt, um Nutzern die Möglichkeit zu geben,  mit KI-basierten Therapeuten in Dialog zu treten. Die Anwendung basiert  auf der React-Technologie, die für ihre Fähigkeit bekannt ist, eine  ästhetisch ansprechende Benutzeroberfläche zu schaffen, die gleichzeitig  reaktionsschnell und benutzerfreundlich ist. Durch die Implementierung  von React können wir eine interaktive Plattform bieten, die es den  Nutzern ermöglicht, auf einfache und intuitive Weise mit den  KI-Therapeuten zu kommunizieren, wodurch ein angenehmes und effektives  Therapieerlebnis geschaffen wird.




##### **Dokumentation der technische Seite:**
In unserem Entwicklungsprozess haben wir uns intensiv mit bewerteten und korrigierten Beispielgesprächen auseinandergesetzt. Die resultierenden Daten wurden sorgfältig in das richtige Format gebracht und entsprechend gelabelt, um eine präzise Kontrolle über den Trainingsprozess zu gewährleisten. Dabei haben wir uns bewusst für das OpenAI API entschieden und speziell für GPT Turbo 3.5 als unser gewähltes Modell.

Es war uns klar, dass das von OpenAI bereitgestellte Prompt-Tuning keine herkömmliche Feinabstimmung ermöglicht und relativ restriktiv ist. Das bedeutet, dass wir in einer Art "Sandkasten" arbeiten, in dem wir begrenzte Möglichkeiten haben, das Modell wesentlich zu verändern.

Wir haben das Modell bereits drei Mal trainiert und bei jedem Durchlauf gründlich getestet. Dabei haben wir Potenziale zur Verbesserung identifiziert, die durch die Integration verschiedener Datensätze erreicht werden könnten. Schließlich haben wir eine benutzerfreundliche GUI (Benutzeroberfläche) entwickelt, die folgende Funktionen bietet:

` `Chatmöglichkeit mit dem Modell.



Die Option, Chats zu speichern, um sie später an Therapeuten weiterzuleiten oder zu einem späteren Zeitpunkt erneut einzusehen.




Dieser Ansatz ermöglicht es uns, die Anwendung des Modells nicht nur zu optimieren, sondern auch eine benutzerfreundliche Plattform zu schaffen, die sowohl für Nutzer als auch für Fachleute im therapeutischen Bereich ansprechend ist.



**Validierung:** 

Abschließend haben wir nach Metriken gesucht, die geeignet sind, um das Modell zu evaluieren. Zur Evaluierung haben wir vergleichbare Gespräche sowohl mit unserem feinabgestimmten Modell als auch mit dem herkömmlichen ChatGPT 3.5 geführt, um am Ende zu zeigen, ob unser Feintuning die Leistung und das Verhalten des Modells positiv beeinflusst hat.



**TheraBuddy**: Dokumentenportraits

Unser endgültiges Modell des TherapyBuddys zeigt eine deutliche Überlegenheit im Vergleich zur nicht finegetuneten Version von ChatGP3.5 Turbo. Um diesen Vergleich ziehen zu können, habe ich eine kleine qualitative Validierung von acht Dialogen durchgeführt, indem ich so-wohl mit ChatGPT3.5 Turbo und unseren TherapyBuddy zu den vier Themen „Zukunfts-angst“, „Uni“, „Liebenwert“, „Scheitern“ Gespräche geführt habe (siehe Anhang). Dabei fällt auf, dass der TherapyBuddy im Vergleich deutlich weniger unerwünschte Fachsprache ver-wendet. Außerdem macht er mehr Gebrauch von sokratischen Gesprächsführungstechniken, wie z.B. dem Modell der Verantwortlichkeit oder die logische Analyse, beides kommt bei dem Gespräch mit ChatGPT so gut wie gar nicht vor. Lösungs- und Handlungsmöglichkeiten, so-wie Erklärungshypothesen und Alternativbewertungen werden von beiden Modellen ange-sprochen. ChatGPT3.5 Turbo ist in der Anwendung allerdings weniger konstant – mal spricht er sie an, mal aber auch nicht. Außerdem fällt im Vergleich auf, dass dieses dazu neigt, die kognitive Umstrukturierung teilweise komplett zu überspringen und direkt auf die Verhaltens-ebene versucht zu wechseln. Beide Modell ähneln sich darin, dass sie zunächst genauere In-formationen zum Sachverhalt des konkreten Gedankens sammeln und dass sie versuchen mögliche Zusammenhänge sowie Erklärungen für Erlebtes aufzuzeigen.








