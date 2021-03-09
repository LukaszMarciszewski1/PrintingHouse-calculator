export class Notes {
    constructor() {
        this.container = document.querySelector('.calculator')
        this.dragItem = document.querySelector('.top-bar');
        this.dragElement = document.querySelector('.notes-container')
        this.notesBtn = document.querySelector('.notes-btn')
        this.textarea = document.querySelector('.textarea')
        this.saveBtn = document.querySelector('.save-notes')
        this.storedTxt = localStorage.getItem('notesTxt')
        
        this.active = false;
        this.currentX;
        this.currentY;
        this.initialX;
        this.initialY;
        this.xOffset = 0;
        this.yOffset = 0;

        this.notesBtn.addEventListener("click", this.openNotes.bind(this));
        this.dragItem.lastElementChild.addEventListener("click", this.closeNotes.bind(this));
        this.dragItem.addEventListener("mousedown", this.dragStart.bind(this));
        this.dragItem.addEventListener("mouseup", this.dragEnd.bind(this));
        this.dragItem.addEventListener("mousemove", this.drag.bind(this));
        this.dragItem.addEventListener("mouseleave", this.onMouseLeave.bind(this));

        this.saveBtn.addEventListener("click", this.saveNotes.bind(this));
        this.displayNotes()
    }

    positionNotes(){
        if(innerWidth > 820){
            this.xOffset = 0;
            this.yOffset = 0;
            this.dragElement.style.transform = `translate3d(${0}px, ${0}px, 0)`;
        }
    }
    openNotes() {
        this.dragElement.classList.add('notes-container--active')
        this.notesBtn.classList.add('notes-btn--active')
    }

    closeNotes() {
        this.notesBtn.classList.remove('notes-btn--active')
        this.dragElement.classList.remove('notes-container--active')
        this.positionNotes()
    }

    dragStart(e) {
        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;
        if (e.target === this.dragItem && innerWidth > 820) {
            this.active = true;
            this.dragItem.classList.add('top-bar--active')
        }

    }

    dragEnd() {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.dragItem.classList.remove('top-bar--active')
        this.active = false;
    }

    drag(e) {
        if (this.active && innerWidth > 820) {
            e.preventDefault();
            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            const notesContainerWidth = this.dragElement.clientWidth
            const containerWidth = this.container.clientWidth
            const notesContainerHeight = this.dragElement.clientHeight
            const containerHeight = this.container.clientHeight
            const left = 50 // draw the element in the position from the left side
            const top = 150 // draw the element in the position from the top side
            //left side
            if(this.currentX < -left){
                this.currentX = -left
            }

            //top side
            if(this.currentY < -top){
                this.currentY = -top
            }

            // right side
            if(this.currentX + notesContainerWidth > containerWidth - left){
                this.currentX = containerWidth - notesContainerWidth - left
            }

            // bottom side
            if(this.currentY + notesContainerHeight > containerHeight - top){
                this.currentY = containerHeight - notesContainerHeight - top
            }

            this.dragElement.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
        }
        
    }

    onMouseLeave() {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;
    }

    displayNotes() {
        if(this.storedTxt){
            this.textarea.textContent = this.storedTxt
        }
    }

    saveNotes() {
        localStorage.setItem('notesTxt', this.textarea.value)
    }
}
