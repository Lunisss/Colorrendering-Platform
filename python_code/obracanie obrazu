import tkinter as tk
from PIL import Image, ImageTk
import cv2
import numpy as np

# Przykładowy obrazek (zdefiniowany jako macierz kolorów)
obraz_cv2 = np.zeros((200, 200, 3), np.uint8)
obraz_cv2[:, :100] = (255, 255, 255)      # Lewa połowa - biały
obraz_cv2[:, 100:] = (0, 0, 255)          # Prawa połowa - czerwony
obraz_pil = Image.fromarray(cv2.cvtColor(obraz_cv2, cv2.COLOR_BGR2RGB))

def aktualizuj_obraz():
    global foto
    if obraz_pil:
        okno_width = okno.winfo_width()
        okno_height = okno.winfo_height()
        obraz = obraz_pil.resize((okno_width, okno_height), Image.LANCZOS)
        foto = ImageTk.PhotoImage(obraz)
        okno.create_image(0, 0, image=foto, anchor="nw")

def obracaj_obraz(kat):
    global obraz_pil, foto
    if obraz_pil:
        obraz_cv2 = cv2.cvtColor(np.array(obraz_pil), cv2.COLOR_RGB2BGR)
        height, width = obraz_cv2.shape[:2]
        center = (width // 2, height // 2)
        matrix = cv2.getRotationMatrix2D(center, int(kat), 1.0)
        obraz_rotated = cv2.warpAffine(obraz_cv2, matrix, (width, height))
        obraz_pil_rotated = Image.fromarray(cv2.cvtColor(obraz_rotated, cv2.COLOR_BGR2RGB))
        foto = ImageTk.PhotoImage(obraz_pil_rotated)
        okno.create_image(0, 0, image=foto, anchor="nw")

def clear_selection():
    okno.delete("all")
    aktualizuj_obraz()

root = tk.Tk()
root.title("obracanie obrazów")
okno = tk.Canvas(root)
okno.pack(fill="both", expand=True)

suwak = tk.Scale(root, from_=0, to=360, orient="horizontal", label="Kąt obrotu", command=obracaj_obraz)
suwak.pack()

clear_button = tk.Button(root, text="Clear", command=clear_selection)
clear_button.pack()

foto = None

aktualizuj_obraz()
root.mainloop()











