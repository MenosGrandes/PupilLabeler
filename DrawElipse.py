from Tkinter import *
from PIL import ImageTk,Image  
import math
# this file demonstrates the movement of a single canvas item under mouse control
class Point():
    def __init__(self, x=0, y=0):
            """ Create a new point at x, y """
            self.x = x
            self.y = y
    def __str__(self):
            return "({0}, {1})".format(self.x, self.y)
    def __div__(self,integer):
            return Point(self.x/integer,self.y/integer)
    def __sub__(self,integer):
            return Point(self.x-integer,self.y-integer)
    def __add__(self,integer):
            return Point(self.x+integer,self.y+integer)
class Ellipse():
    def __init__(self, start=Point(0,0), end=Point(0,0)):
        """ Create a new point at x, y """
        self.start = start
        self.end = end
class EllipseDrawer():
    def __init__(self,elipse,canvas):
        self.elipse=elipse
        self.elipseId=canvas.create_oval(0,0,0,0,dash=(3,5))
    def drawOwal(self,canvas):
        canvas.coords(self.elipseId,self.elipse.start.x,self.elipse.start.y,self.elipse.end.x,self.elipse.end.y)
    def getElipseStart(self):
        return self.elipse.start
    def getElipseEnd(self):
        return self.elipse.end
    def setElipseStart(self,start):
        self.elipse.start = start
    def setElipseEnd(self,end):
        self.elipse.end = end
class Test(Frame):
    ###################################################################
    ###### Event callbacks for THE CANVAS (not the stuff drawn on it)
    ###################################################################
    def mouseDown(self, event):
        # remember where the mouse went down
        self.last = Point(event.x,event.y)
    def mouseUp(self, event):
        # remember where the mouse went down
        self.last = Point(event.x,event.y)

    def mouseMove(self, event):
        self.draw.move(CURRENT, event.x - self.last.x, event.y - self.last.y)
        self.last = Point(event.x,event.y)
        self.ellipseDrawer.drawOwal(self.draw)

    def mouseLeaveStart(self, event):
        self.ellipseDrawer.setElipseStart(Point(event.x,event.y))
    def mouseLeaveEnd(self, event):
        self.ellipseDrawer.setElipseEnd(Point(event.x,event.y))
    def createWidgets(self):
        self.canvasSize=Point(800,600);

        self.QUIT = Button(self, text='QUIT', foreground='red', command=self.quit)
        self.QUIT.pack(side=LEFT, fill=BOTH)
        self.draw = Canvas(self, width=self.canvasSize.x, height=self.canvasSize.y)
        self.draw.pack(side=LEFT)
        self.ellipseDrawer = EllipseDrawer(Ellipse(start=self.canvasSize/2,end=self.canvasSize/4),self.draw)

        self.startPoint = self.draw.create_oval(self.ellipseDrawer.getElipseStart().x+5, self.ellipseDrawer.getElipseStart().y+5, self.ellipseDrawer.getElipseStart().x-5, self.ellipseDrawer.getElipseStart().y-5,fill="green", tags="startPoint")
        self.endPoint = self.draw.create_oval(self.ellipseDrawer.getElipseEnd().x+5, self.ellipseDrawer.getElipseEnd().y+5, self.ellipseDrawer.getElipseEnd().x-5, self.ellipseDrawer.getElipseEnd().y-5, fill="red", tags="endPoint")

                                     

        self.draw.tag_bind(self.startPoint, "<Any-Leave>", self.mouseLeaveStart)
        self.draw.tag_bind(self.endPoint, "<Any-Leave>", self.mouseLeaveEnd)
        Widget.bind(self.draw, "<1>", self.mouseDown)
        Widget.bind(self.draw, "<ButtonRelease-1>", self.mouseUp)
        Widget.bind(self.draw, "<B1-Motion>", self.mouseMove)

        
    def __init__(self, master=None):
        Frame.__init__(self, master)
        Pack.config(self)
        self.createWidgets()

        
test = Test()
test.mainloop()
