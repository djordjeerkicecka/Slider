class FeatureSlider extends HTMLElement {
    constructor() {
        super();
    
        this.isGrabbing = false;
        this.activeSlideIndex = -1;
        this.pointerPositionLastX = null;
        this.pointerPositionDelta = null;

        this.slidesCount = Number(this.dataset.slidesCount ? this.dataset.slidesCount : 3);
        
        this.slides = Array.from(this.querySelectorAll('.slide'));
    }

    connectedCallback() {
        this.attachEventListeners();

        this.style.setProperty('--slider-slide-count', this.slidesCount);
    }

    sayHello() {
        console.log("Hello from: ", this);
    }

    attachEventListeners() {
        window.addEventListener('mouseup', () => this.setInactiveState());

        this.addEventListener('mouseup', () => this.setInactiveState());

        this.addEventListener('mousedown', event => this.setActiveState(event));

        this.addEventListener('mousemove', event => {
            requestAnimationFrame(() => {
                if(this.isGrabbing) {
                    this.pointerPositionDelta = this.pointerPositionLastX - this.getPointerPositionX(event);
                    this.scrollLeft += this.pointerPositionDelta;
                }
            })
        })

        this.slides.forEach(slide => slide.addEventListener('click', event => {
            if(Math.abs(this.pointerPositionDelta) > 0) {
                event.preventDefault();
                this.pointerPositionDelta = 0;
            }
        }))
    }

    getPointerPositionX(event) {
        return event.clientX + this.scrollLeft;
    }

    setActiveState(event) {
        this.isGrabbing = true;
        this.classList.add('grabbing');
        this.pointerPositionDelta = 0;
        this.pointerPositionLastX = this.getPointerPositionX(event);
    }

    setInactiveState() {
        this.isGrabbing = false;
        this.classList.remove('grabbing');
    }
}

if(!customElements.get('feature-slider')) customElements.define('feature-slider', FeatureSlider);