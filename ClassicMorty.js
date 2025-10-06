import MortyBase from "./MortyBase.js";

export default class ClassicMorty extends MortyBase {
    getProbabilityStay() {
        return 1 / this.numOfBoxes;
    }

    getProbabilitySwitch() {
        return (this.numOfBoxes - 1) / this.numOfBoxes;
    }

    async decideKeptBoxes(chosen, prize, fairRandom, ask) {
        const allBoxes = [...Array(this.numOfBoxes).keys()];
        const unchosen = allBoxes.filter(i => i !== chosen);
        let safe = prize === chosen ? unchosen : [prize];
        safe = safe.sort((a, b) => a - b);

        const range = this.numOfBoxes - 1;
        const r = await fairRandom(range, 'and, uh, don`t say I didn`t play fair, okay?');
        const index = r % safe.length;
        return [safe[index]];
    }
}