import tkinter as tk


class BrokenLineApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Broken Line Drawer")

        self.canvas = tk.Canvas(root, width=800, height=600, bg="white")
        self.canvas.pack()

        self.points = []
        self.closed = False

        self.canvas.bind("<Button-1>", self.add_point)
        self.finish_button = tk.Button(root, text="Finish Polygon", command=self.finish_polygon)
        self.finish_button.pack()

        self.clear_button = tk.Button(root, text="Clear", command=self.clear_canvas)
        self.clear_button.pack()

    def add_point(self, event):
        if self.closed:
            return
        x, y = event.x, event.y
        self.points.append((x, y))
        self.canvas.create_oval(x - 3, y - 3, x + 3, y + 3, fill='black')
        if len(self.points) > 1:
            self.canvas.create_line(self.points[-2], self.points[-1], fill='blue')

    def finish_polygon(self):
        if len(self.points) > 2:
            self.canvas.create_line(self.points[-1], self.points[0], fill='blue')
            self.closed = True
            self.fill_with_hatching()

    def fill_with_hatching(self):
        self.canvas.create_polygon(self.points, outline='blue', fill='')
        bbox = self.canvas.bbox(self.canvas.create_polygon(self.points, outline='blue', fill=''))
        min_x, min_y, max_x, max_y = bbox

        step = 10
        for x in range(int(min_x), int(max_x), step):
            self.canvas.create_line(x, min_y, x, max_y, fill='gray', dash=(4, 2))
        for y in range(int(min_y), int(max_y), step):
            self.canvas.create_line(min_x, y, max_x, y, fill='gray', dash=(4, 2))

    def clear_canvas(self):
        self.canvas.delete("all")
        self.points = []
        self.closed = False


if __name__ == "__main__":
    root = tk.Tk()
    app = BrokenLineApp(root)
    root.mainloop()
