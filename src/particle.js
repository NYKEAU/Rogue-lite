export class Particle {
    constructor(x, y, color, direction) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 5 + 1;

        // Nouvelles propriétés pour la direction
        this.direction = direction;
        this.speed = Math.random() * 3; // Utiliser la vitesse de la balle

        // Calculer la vitesse en fonction de la direction
        this.speedX = this.speed * this.direction.x;
        this.speedY = this.speed * this.direction.y;

        this.duration = 15; // Durée de l'effet en frames
    }

    // Méthode pour dessiner la particule
    draw(context, enemySize, mapStartX, mapStartY) {
        console.log('Drawing particle at:', this.x + enemySize / 2 + mapStartX, this.y + enemySize / 2 + mapStartY, this.x, this.y, enemySize, mapStartX, mapStartY);
        if (this.duration > 0) {
            context.fillStyle = 'white';
            this.duration--;
        } else {
            context.fillStyle = this.color;
        }
        context.beginPath();
        context.arc(this.x + enemySize / 2 + mapStartX, this.y + enemySize / 2 + mapStartY, this.size, 0, Math.PI * 2);
        context.fill();
    }

    // Méthode pour mettre à jour la position de la particule
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Réduire la taille de la particule au fil du temps
        this.size -= 0.1;
    }
}
