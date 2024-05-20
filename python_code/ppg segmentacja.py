import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk

#funkcja ładująca obrazek
def zaladuj_obraz(okno):
    obraz = Image.open("obraz.jpg") #miejsce dodania obrazu
    obraz = obraz.resize((1280, 720)) #resolution tak założyłem 720p
    foto = ImageTk.PhotoImage(obraz)

    okno.create_image(0, 0, image=foto, anchor="nw")
    okno.foto = foto
#bind-owanie guzików
    okno.bind("<ButtonPress-1>", lambda event: nacisniecie(event, okno))
    okno.bind("<B1-Motion>", lambda event: przeciaganie(event, okno))
    okno.bind("<ButtonRelease-1>", lambda event: zwolnienie(event, okno, obraz))

#funkcja wycinania
def wytnij_prostokat(okno, start_x, start_y, end_x, end_y, obraz):
    if start_x is not None and start_y is not None and end_x is not None and end_y is not None:
        x1 = min(start_x, end_x)
        y1 = min(start_y, end_y)
        x2 = max(start_x, end_x)
        y2 = max(start_y, end_y)

        wybrany_obszar = obraz.crop((x1, y1, x2, y2))
        sciezka = filedialog.asksaveasfilename(defaultextension=".png")

        if sciezka:
            wybrany_obszar.save(sciezka)

#definiowanie naciśnięcia
def nacisniecie(event, okno):
    okno.start_x = okno.canvasx(event.x)
    okno.start_y = okno.canvasy(event.y)

#definiowanie zakończenia- przeciągnięcia-> end point (x,y)
def przeciaganie(event, okno):
    if okno.rect:
        okno.delete(okno.rect)
    okno.end_x = okno.canvasx(event.x)
    okno.end_y = okno.canvasy(event.y)
    okno.rect = okno.create_rectangle(okno.start_x, okno.start_y, okno.end_x, okno.end_y, outline="red")

#złączenie punktów (x1,y1) startowych z finalnymi (x2,y2)- tworzenie prostokąta
def zwolnienie(event,okno, obraz):
    wytnij_prostokat(okno, okno.start_x, okno.start_y, okno.end_x, okno.end_y, obraz)
    wyczysc_okno(okno)

#wczyszcenie okna
def wyczysc_okno(okno):
    okno.delete(okno.rect)
    okno.start_x = None
    okno.start_y = None
    okno.end_x = None
    okno.end_y = None

#funkcja main
def main():
    root = tk.Tk()
    root.title("Kreator wycinania obrazów")

    okno = tk.Canvas(root)
    okno.pack(fill="both", expand=True)

    obraz = Image.open("obraz.jpg")
    obraz = obraz.resize((800, 600))
    foto = ImageTk.PhotoImage(obraz)
    id_obrazu = okno.create_image(0, 0, image=foto, anchor="nw")
    okno.foto = foto

    okno.start_x = None
    okno.start_y = None
    okno.end_x = None
    okno.end_y = None
    okno.rect = None

    zaladuj_obraz(okno)

    root.mainloop()


if __name__ == "__main__":
    main()