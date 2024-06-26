class Boundary {
    static width = 40
    static height = 40
    constructor({ position }) {
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw() {
        // i can change the last value in rgba() which is opacity to make all the boundaries visible in-game. this is very useful for
        // testing and debugging purposes.
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Sprite {
    constructor({ position, image, frames = { max: 1 }, sprites = [] }) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }

    // this draw function is different from the more simple one used in the Boundary class. 
    draw() {
        // the goal here is to animate the player's sprite whenever they're moving. by default the player images are one image containing 4 
        // sprites for each direction, one for each animated frame. the code in the drawImage function crops the image to the size of just one sprite.
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )

        // the rest of the code in the draw function is there to change the way the image is cropped to the next frame whenever the player is
        // moving. it also makes sure that after getting to the 4th sprite, it changes back to the first one.
        if (!this.moving) return
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}

