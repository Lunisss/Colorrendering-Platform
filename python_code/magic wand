import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import cv2
import numpy as np


def zaladuj_obraz(okno, suwak, clear_button):
    obraz = Image.open("225544_zimowy_pejzaz.jpg")  # Zaktualizowana ścieżka do pliku
    obraz = obraz.resize((1280, 720))  # resolution tak założyłem 720p
    foto = ImageTk.PhotoImage(obraz)

    okno.create_image(0, 0, image=foto, anchor="nw")
    okno.foto = foto
    okno.obraz = obraz  # Save the original PIL image

    okno.bind("<ButtonRelease-1>", lambda event: magic_wand(event, okno, suwak.get(), clear_button))


def magic_wand(event, okno, czulosc, clear_button):
    x, y = event.x, event.y
    obraz_pil = okno.obraz.copy()  # Utwórz kopię obrazu, aby nie zmieniać oryginalnego obrazu
    obraz_cv2 = cv2.cvtColor(np.array(obraz_pil), cv2.COLOR_RGB2BGR)

    # Utwórz maskę i wypełnij ją zerami
    mask = np.zeros((obraz_cv2.shape[0] + 2, obraz_cv2.shape[1] + 2), np.uint8)

    # Konwertuj punkt nasienia na koordynaty maski
    seed_point = (x, y)
    seed_point_mask = (x + 1, y + 1)  # Dodaj 1, ponieważ maska ma dodatkowy wiersz i kolumnę

    # Zdefiniuj progi różnicy kolorów
    lo_diff = (czulosc, czulosc, czulosc)
    up_diff = (czulosc, czulosc, czulosc)

    # Wypełnij maskę przy użyciu algorytmu FloodFill
    cv2.floodFill(obraz_cv2, mask, seed_point_mask, (255, 255, 255), lo_diff, up_diff, flags=cv2.FLOODFILL_FIXED_RANGE)

    # Znajdź kontury w obszarze wyróżnionym
    contours, _ = cv2.findContours(mask[1:-1, 1:-1], cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Rysuj kontur obszaru zainteresowania na kopii obrazu
    cv2.drawContours(obraz_cv2, contours, -1, (0, 255, 0), 2)  # Zielony kolor

    wynikowy_obraz = Image.fromarray(cv2.cvtColor(obraz_cv2, cv2.COLOR_BGR2RGB))
    wynikowe_foto = ImageTk.PhotoImage(wynikowy_obraz)

    okno.create_image(0, 0, image=wynikowe_foto, anchor="nw")
    okno.foto = wynikowe_foto


def clear_selection(okno, suwak, clear_button):
    okno.delete("all")
    zaladuj_obraz(okno, suwak, clear_button)


def main():
    root = tk.Tk()
    root.title("Kreator wycinania obrazów")

    okno = tk.Canvas(root)
    okno.pack(fill="both", expand=True)

    suwak = tk.Scale(root, from_=0, to=255, orient="horizontal", label="Czułość")
    suwak.pack()

    clear_button = tk.Button(root, text="Clear", width=10, command=lambda: clear_selection(okno, suwak, clear_button))
    clear_button.pack()

    okno.start_x = None
    okno.start_y = None
    okno.end_x = None
    okno.end_y = None
    okno.rect = None

    zaladuj_obraz(okno, suwak, clear_button)

    root.mainloop()


if __name__ == "__main__":
    main()
