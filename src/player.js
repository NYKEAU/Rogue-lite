import { HitEffect } from './hitEffect.js';
import { Pistol, Shotgun, SMG, Famas, Sniper } from './weapon.js';

export class Player {
    // Définir le constructeur de la classe
    constructor(x, y, gameInstance) {
        this.gameInstance = gameInstance;
        this.x = x; // La position x du joueur
        this.y = y; // La position y du joueur
        this.width = 30; // La largeur du joueur
        this.height = 30; // La hauteur du joueur
        this.items = []; // Les items du joueur

        // Armes et Projets
        this.weapon = new Pistol(this); // Ajouter l'arme de base du joueur
        this.projectiles = []; // Initialiser les projectiles comme un tableau vide

        // Mouvement
        this.speed = 7.5; // La vitesse de déplacement du joueur

        // Santé et Niveau
        this.health = 100; // La santé du joueur
        this.maxHealth = this.health; // La santé maximale du joueur
        this.level = 1; // Niveau du joueur au début du jeu
        this.experience = 0; // Expérience du joueur au début du jeu
        this.maxExperience = 100; // Expérience maximale du prochain niveau du joueur
        this.money = 0; // Argent du joueur au début du jeu

        // Dégâts et Attaque
        this.damage = this.weapon.damage; // Les dégâts du joueur
        this.defense = 0; // La défense du joueur
        this.rof = 0; // La cadence de tir du joueur

        // Effets Visuels
        this.hitEffects = []; // Tableau des hitmarkers
        this.duration = 100; // La durée de l'effet de flash quand le joueur subit des dégâts
        this.hitFlash = false; // Si le joueur subit des dégâts
    }

    // Méthode pour dessiner le joueur
    draw(context, x, y, mapStartX, mapStartY) {
        // Dessiner les effets de coup avant de vérifier si le joueur est mort
        for (let hitEffect of this.hitEffects) {
            hitEffect.draw(context, mapStartX - 10, mapStartY);
        }

        context.fillStyle = this.hitFlash ? 'white' : 'red';
        context.fillRect(x, y, this.width, this.height);
    }

    // Méthode pour dessiner la barre de vie du joueur
    drawHealthBar(context) {
        const barWidth = this.health; // La largeur de la barre de vie est égale à la santé du joueur
        const barHeight = 25; // La hauteur de la barre de vie
        const barX = 10; // La position x de la barre de vie (10 pixels depuis le bord gauche de l'écran)
        const barY = 10; // La position y de la barre de vie (10 pixels depuis le haut de l'écran)

        // Dessiner le contour de la barre de vie
        context.strokeStyle = 'black';
        context.strokeRect(barX, barY, this.maxHealth, barHeight); // La largeur du contour est toujours de 100 pixels, indépendamment de la santé du joueur

        // Remplir l'intérieur de la barre de vie en rouge
        context.fillStyle = 'red';
        context.fillRect(barX, barY, barWidth, barHeight);

        // Préparer le texte
        const healthText = this.health + '/' + this.maxHealth;
        const textWidth = context.measureText(healthText).width;

        // Calculer la position x du texte
        const textX = Math.max(barX + barWidth - textWidth - 5, barX + 5);

        // Dessiner le nombre de points de vie dans la barre de vie
        context.fillStyle = 'black'; // Couleur du texte
        context.font = '16px Arial'; // Taille et police du texte
        context.fillText(healthText, barX + 5, barY + 17.5); // Position du texte
    }

    // Méthode pour dessiner la barre d'expérience du joueur
    drawExperienceBar(context) {
        // Sauvegarder l'état actuel du contexte
        context.save();

        const barWidth = (this.experience / this.maxExperience) * this.maxHealth; // La largeur de la barre d'expérience est proportionnelle à l'expérience du joueur
        const barHeight = 12.5; // La hauteur de la barre d'expérience
        const barX = 10; // La position x de la barre d'expérience (10 pixels depuis le bord gauche de l'écran)
        const barY = 40; // La position y de la barre d'expérience (40 pixels depuis le haut de l'écran)

        // Dessiner le contour de la barre d'expérience
        context.strokeStyle = 'black';
        context.strokeRect(barX, barY, this.maxHealth, barHeight); // La largeur du contour est maintenant égale à la santé maximale du joueur

        // Remplir l'intérieur de la barre d'expérience en bleu
        context.fillStyle = 'blue';
        context.fillRect(barX, barY, barWidth, barHeight);

        // Préparer le texte
        const experienceText = this.experience + '/' + this.maxExperience;

        // Dessiner l'expérience du joueur dans la barre d'expérience
        context.fillStyle = 'black'; // Couleur du texte
        context.font = '10px Arial'; // Taille et police du texte
        context.textAlign = 'right'; // Aligner le texte à droite
        context.fillText(experienceText, barX + this.maxHealth - 5, barY + barHeight / 2 + 4); // Position du texte

        // Restaurer l'état du contexte
        context.restore();
    }

    // Méthode pour dessiner l'argent du joueur
    drawMoney(context) {
        // Préparer le texte
        const moneyText = 'Argent: ' + this.money;

        // Dessiner l'argent du joueur en haut de l'écran
        context.fillStyle = 'black'; // Couleur du texte
        context.font = '16px Arial'; // Taille et police du texte
        context.fillText(moneyText, 10, 70); // Position du texte
    }

    // Méthode pour ajouter un item et mettre à jour les statistiques du joueur
    addItem(item) {
        this.items.push(item);
        console.log(item);
        this.updateStats(item.stats);
    }

    // Méthode pour mettre à jour les statistiques du joueur
    updateStats(stats) {
        // Mettre à jour les statistiques du joueur en fonction de l'item
        for (let stat in stats) {
            if (stat === 'Vie') {
                this.health = this.health + Math.ceil(this.health * stats[stat] / 1000);
                if (this.health > this.maxHealth) this.health = this.maxHealth;
            } else if (stat === 'VieMax') {
                this.maxHealth = this.maxHealth + Math.ceil(this.maxHealth * stats[stat] / 1000);
            } else if (stat === 'Exp') {
                this.maxExperience = this.maxExperience + Math.ceil(this.maxExperience * stats[stat] / 1000);
            } else if (stat === 'Argent') {
                this.money = this.money + Math.ceil(this.money * stats[stat] / 1000);
            } else if (stat === 'DégâtsJoueur') {
                this.damage = this.damage + Math.ceil(this.damage * stats[stat] / 1000);
            } else if (stat === 'Défense') {
                this.defense = this.defense + Math.ceil(this.defense * stats[stat] / 1000);
            } else if (stat === 'CadenceJoueur') {
                this.rof = this.rof + Math.ceil(this.rof * stats[stat] / 1000);
            } else if (stat === 'CadenceTir') {
                this.speed = this.weapon.speed + Math.ceil(this.speed * stats[stat] / 1000);
            } else if (stat === 'Vitesse') {
                this.speed = this.speed + Math.ceil(this.speed * stats[stat] / 1000);
            } else if (stat === 'Portée') {
                this.range = this.range + Math.ceil(this.range * stats[stat] / 1000);
            } else if (stat === 'DégâtsArmes') {
                this.damage = this.weapon.damage + Math.ceil(this.damage * stats[stat] / 1000);
            }
        }
    }

    // VieMax', 'Exp', 'Argent', 'Dégâts', 'Défense', 'CadenceTir', 'CadenceTir', 'Vitesse', 'Portée', 'Dégâts'

    // Méthode pour déplacer le joueur
    move(keys, mapWidth, mapHeight, enemies) {
        // Calculer la nouvelle position du joueur
        let newX = this.x;
        let newY = this.y;

        if (keys['ArrowUp'] || keys['z']) newY -= this.speed;
        if (keys['ArrowDown'] || keys['s']) newY += this.speed;
        if (keys['ArrowLeft'] || keys['q']) newX -= this.speed;
        if (keys['ArrowRight'] || keys['d']) newX += this.speed;

        // Vérifier si le joueur est à l'intérieur de la zone de jeu
        this.x = Math.max(0, Math.min(mapWidth - this.width, newX));
        this.y = Math.max(0, Math.min(mapHeight - this.height, newY));
    }

    // Méthode pour gérer la collision avec un ennemi
    isCollidingWithEnemy(object) {
        // Si l'ennemi est mort, ne pas gérer la collision
        if (!object.isDead) {
            return this.x < object.x + object.width &&
                this.x + this.width > object.x &&
                this.y < object.y + object.height &&
                this.y + this.height > object.y;
        } else {
            return;
        }
    }

    // Méthode pour vérifier la collision avec une pièce
    isCollidingWithCoin(coin) {
        return this.x < coin.x + coin.width &&
            this.x + this.width > coin.x &&
            this.y < coin.y + coin.height &&
            this.y + this.height > coin.y;
    }

    // Méthode pour augmenter l'argent du joueur
    increaseMoney(amount) {
        this.money += amount;
    }

    // Méthode pour réduire la santé du joueur
    decreaseHealth(amount) {
        this.health -= amount;
        this.hitFlash = true;
        setTimeout(() => {
            this.hitFlash = false;
        }, this.duration);

        // Afficher le nombre de dégâts subis
        this.hitEffects.push(new HitEffect(this, amount, 'player'));

        // Jouer le son de dégâts
        // const hitSound = new Audio('../sounds/playerHitSound.mp3');
        // hitSound.play();
    }

    // Méthode pour augmenter le niveau d'expérience du joueur
    levelUp() {
        // Augmenter le niveau du joueur
        this.level++;
        let healthPercent = this.health / this.maxHealth;

        // Augmenter la vie max du joueur en fonction de sa vie max actuelle
        let increment = 10 ** Math.floor(Math.log10(this.maxHealth));
        this.maxHealth += increment / 10;

        if (this.level % 10 === 0) {
            this.maxHealth = Math.ceil(this.maxHealth * 1.025 / 10) * 10;
            this.maxExperience += 100;
        };

        // Augmenter les dégâts du joueur (sans décimales et arrondi au chiffre supérieur)
        this.damage = Math.floor(this.damage * 1.01);
        this.health = Math.floor(this.maxHealth * healthPercent / 10) * 10;

        // Modifier la génération des ennemis
        if (this.level % 1 === 0) {
            this.gameInstance.stopEnemyGeneration();
            this.gameInstance.displayShop();
        }

        // Réinitialiser l'expérience du joueur
        this.experience = 0;
    }

    // Méthode pour augmenter l'expérience du joueur
    increaseExperience(amount) {
        this.experience += amount;

        // Si l'expérience du joueur est supérieure à l'expérience maximale
        if (this.experience >= this.maxExperience) {
            // Augmenter le niveau du joueur
            this.levelUp();
        }
    }
}
