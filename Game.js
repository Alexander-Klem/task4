import Arguments from "./Arguments.js";
import Protocol from "./Protocol.js";
import Statistics from "./Statistics.js";
import MortyLoader from "./MortyLoader.js";

import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function ask(question) {
    return new Promise(res => { rl.question(question + ' ', res) });
}

async function main() {
    try {
        const args = new Arguments(process.argv);

        const generator = new Protocol(rl);
        const stats = new Statistics();

        const mortyClass = await MortyLoader.load(args.mortyPath, args.mortyClass);
        const morty = new mortyClass(args.boxCount);

        let keepPlaying = true;

        while (keepPlaying) {
            console.log(`Morty: Oh geez, Rick, I'm gonna hide your portal gun in one of the ${args.boxCount} boxes, okay?`)
            
            const prize = await generator.generate(args.boxCount);

            const chosenInput = await ask(`Morty: Okay, okay, I hid the gun. What’s your guess [0,${args.boxCount})?`);

            console.log('Morty: Let’s, uh, generate another value now, I mean, to select a box to keep in the game.');

            const additionalInput = await generator.generate(args.boxCount - 1);

            const initialChosen = parseInt(chosenInput, 10);

            if (isNaN(initialChosen) || initialChosen < 0 || initialChosen >= args.boxCount) {
                console.log('Invalid guess. Try again.');
                continue;
            }

            const additionalKept = await morty.decideKeptBoxes(initialChosen, prize, additionalInput);

            let switched = false;
            let finalChosen = initialChosen;
            
            if (additionalKept.length > 0) {
                const other = additionalKept[0];
                console.log(`Morty: I'm keeping the box you chose, I mean ${initialChosen}, and the box ${other}.`);
                
                const choiceInput = await ask(`Morty: You can switch your box (enter ${other}), or, you know, stick with it (enter ${initialChosen}).`);
                const choice = parseInt(choiceInput, 10);
                
                if (choice === initialChosen) switched = false;
                else if (choice === other) { switched = true; finalChosen = other; }
                else { console.log('Invalid choice. Try again.'); continue; }
            }
            
            generator.revealAll();
                        
            console.log(`Morty: Your portal gun is in the box ${prize}.`);
            
            const won = finalChosen === prize;
            
            console.log(won ? 'Morty: You won!' : 'Morty: Aww man, you lost, Rick. Now we gotta go on one of *my* adventures!');
            
            stats.record(switched, won);
            
            const playAgain = await ask('Morty: D-do you wanna play another round (y/n)?');
            keepPlaying = playAgain.toLowerCase() === 'y';
            
            generator.reset();
        }

        console.log('Morty: Okay… uh, bye!');
        stats.statistics(morty.getProbabilitySwitch(), morty.getProbabilityStay());
        rl.close();
    } catch (error) { 
        console.error(error.message);
        console.error('Example: node Game.js 3 ./ClassicMorty.js ClassicMorty');
        process.exit(1);
    }
}

main();