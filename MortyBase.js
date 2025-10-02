export default class MortyBase { 
    constructor(numOfBoxes){ 
        this.numOfBoxes = numOfBoxes; 
    }

    //Morty decides which boxes to keep
    decideKeptBoxes() { 
        throw new Error('decideKeptBoxes must be implemented in subclass');
    }

    //The probability of winning while maintaining the choice
    getProbabilityStay() { 
        throw new Error('getProbabilityStay must be implemented in subclass');
    }

    //The probability of winning when changing the choice
    getProbabilitySwitch() { 
        throw new Error('getProbabilitySwitch must be implemented in subclass');
    }
}