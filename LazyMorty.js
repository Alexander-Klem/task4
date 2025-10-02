import MortyBase from "./MortyBase.js";

export default class LazyMorty extends MortyBase { 
    getProbabilityStay() { 
        return 1 / this.numOfBoxes;
    }

    getProbabilitySwitch() {
        return (this.numOfBoxes - 1) / this.numOfBoxes;
    }

    async decideKeptBoxes(chosen, prize) {
        const allBoxes = [...Array(this.numOfBoxes).keys()];
        const unchosen = allBoxes.filter(i => i !== chosen);

        let keepingBoxes;
        if (prize === chosen) {
            keepingBoxes = [unchosen.length > 0 ? unchosen[0] : chosen]
        } keepingBoxes = [prize];

        return keepingBoxes;
    }
}