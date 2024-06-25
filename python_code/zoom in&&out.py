from tkinter import *

# Inicjalizacja głównego okna aplikacji
root = Tk()

# Dodanie pustej etykiety (Label)
Label(root).pack()

# Utworzenie płótna (Canvas) o wymiarach 400x400 pikseli
canvas = Canvas(root, width=1280, height=720)
canvas.pack(fill=BOTH, expand=1)

# Utworzenie przycisku z tekstem 'zoomin-out'


# Narysowanie linii na płótnie od punktu (175, 175) do (225, 225)
canvas.create_line(175, 175, 225, 225)


# Funkcja obsługująca zoom (przybliżanie i oddalanie)
def zoom(event):
    # Sprawdzenie kierunku scrolla
    if event.delta > 0:
        amt = 1.1  # Przybliżanie (scroll do góry)
    else:
        amt = 0.9  # Oddalanie (scroll w dół)

    # Skalowanie zawartości płótna względem punktu pod kursorem myszy
    canvas.scale(ALL, event.x, event.y, amt, amt)

    # Aktualizacja obszaru przewijania płótna
    canvas.configure(scrollregion=canvas.bbox("all"))


# Powiązanie zdarzenia scrolla myszy z funkcją zoom
canvas.bind('<MouseWheel>', zoom)

# Uruchomienie głównej pętli aplikacji
root.mainloop()
