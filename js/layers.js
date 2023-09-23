addLayer("p", {
    name: "prestige", // Optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Price to convert base --> prestige
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Base --> Prestige currency conversion exponent
    gainMult() { // Calculate the multiplier this layer's currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades:{
        11:{
            title: "Point Purifier",
            description: "Doubles point gain.",
            cost: new Decimal(1),
        },

        12:{
            title: "Point Processor",
            description: "Boosts point gain by sqrt(pp+1)",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.5) //player[this.layer].points = layer currency
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Display effect
        },

        13:{
            title: "Prestige Enhancer",
            description: "Boosts prestige point gain by (pts+1)^0.15.",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.15) //player.points = base currency
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Display effect
        },

        21:{
            title: "Point Re-Inserter",
            description: "Boosts point gain by (pts+1)^0.15.",
            cost: new Decimal(30),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Display effect
        },

        22:{
            title: "Point Tempering",
            description: "Boosts point gain by ",
            cost: new Decimal(60),
        },
    },
})

addLayer("a", {
    name: "Achievements", 
    symbol: "A", 
    position: 0, 
    startData() { return {
        unlocked: true,
    }},
    resource: "Acheivements",
    color: "#ebe834",
    row: "side",
    layerShown(){return true},
    achievements: {
        11: {
            name: "Humble Beginnings",
            tooltip: "Have 1 prestige point",
            done(){
                if(player.p.points == 1) return true
            }
        },

        12: {
            name: "Making a Start",
            tooltip: "Have 10 prestige points",
            done(){
                if(player.p.points == 10) return true
            }
        },
    }
})