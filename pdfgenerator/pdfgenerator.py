from tkinter import W
from fpdf import FPDF

title = 'Report Generated'


class PDF(FPDF):
    def header(self):
        # font
        self.set_font('helvetica', 'B', 15)
        # Calculate width of title and position
        title_w = self.get_string_width(title) + 6
        doc_w = self.w
        self.set_x((doc_w - title_w) / 2)
        # colors of frame, background, and text
        self.set_draw_color(0, 80, 180) # border = blue
        self.set_fill_color(255, 255, 255) # background = yellow
        self.set_text_color(220, 50, 50) # text = red
        # Thickness of frame (border)
        self.set_line_width(1)
        # Title
        self.cell(title_w, 10, title, border=1, ln=1, align='C', fill=1)

        # Line break
        self.ln(10)


    # Page footer
    def footer(self):
        # Set position of the footer
        self.set_y(-15)
        # set font
        self.set_font('helvetica', 'I', 8)
        # Set font color grey
        self.set_text_color(169,169,169)
        # Page number
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    # Adding chapter title to start of each chapter
    def chapter_title(self, ch_num, ch_title, link):
        # Set link location
        self.set_link(link)
        # set font
        self.set_font('helvetica', '', 12)
        # background color
        self.set_fill_color(200, 220, 255)
        # Chapter title
        chapter_title = f'Chapter {ch_num} : {ch_title}'
        self.cell(0, 5, chapter_title, ln=1, fill=1)
        # line break
        self.ln()

    # Chapter content
    # def chapter_body(self, name):
    #     # read text file
    #     with open(name, 'rb') as fh:
    #         txt = fh.read().decode('latin-1')
    #     # set font
    #     self.set_font('times', '', 12)
    #     # insert text
    #     self.multi_cell(0, 5, txt)
    #     # line break
    #     self.ln()
    #     # end each chapter
    #     self.set_font('times', 'I', 12)
    #     self.cell(0, 5, 'END OF CHAPTER')

    # def print_chapter(self, ch_num, ch_title, name, link):
    #     self.add_page()
    #     self.chapter_title(ch_num, ch_title, link)
    #     self.chapter_body(name)

# Create a PDF object
pdf = PDF('P', 'mm', 'Letter')

# metadata
pdf.set_title(title)
pdf.set_author('Jules Verne')

# Create Links
website = 'http://www.gutenberg.org/cache/epub/164/pg164.txt'
ch1_link = pdf.add_link()
ch2_link = pdf.add_link()


# Set auto page break
pdf.set_auto_page_break(auto = True, margin = 15)

# Add Page
pdf.add_page()
pdf.image('background_image.png', x = 10, w=50)
pdf.cell(100, 60, "Plant Name:", 0, 1, "C")
pdf.cell(200,-60, "Potatos",0,1,"C")
pdf.cell(100, 100, "Disease:", 0, 1, "C")
pdf.cell(200,-100, "powdery meldeuw",0,1,"C")
pdf.cell(100, 140, "Symptoms:", 0, 1, "C")
pdf.cell(200,-140, "red in color",0,1,"C")
pdf.cell(100, 180, "Cure:", 0, 1, "C")
pdf.cell(200,-180, "Spray some pesticides",0,1,"C")






# Attach Links
# pdf.cell(0, 10, 'Text Source', ln = 1, link = website)
# pdf.cell(0, 10, 'Chapter 1', ln = 1, link = ch1_link)
# pdf.cell(0, 10, 'Chapter 2', ln = 1, link = ch2_link)



# pdf.print_chapter(1, 'A RUNAWAY REEF', 'chp1.txt', ch1_link)
# pdf.print_chapter(2, 'THE PROS AND CONS', 'chp2.txt', ch2_link)

pdf.output('pdf_4.pdf')