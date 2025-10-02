import crypto from 'crypto';

//Honest number generation class with HMAC
export default class Protocol { 
    constructor(rl) { 
        this.rl = rl;
        this.history = [];
        this.counter = 0;
    }

    //the method of generating an honest number
    async generate(range, description = ''){ 
        this.counter++;
        const key = crypto.randomBytes(32); 
        let mortyValue = crypto.randomInt(0, range); //случайное число Morty

        const hmac = crypto.createHmac('sha3-256', key)
            .update(mortyValue.toString())
            .digest('hex')
            .toUpperCase();
        
        console.log(`Morty: HMAC${this.counter} = ${hmac}`);

        const offer = `Morty: Rick, enter your number [0,${range})${description ? `, ${description}` : ' so you don’t whine later that I cheated, alright? '}`;

        const rickInput = await new Promise(res => this.rl.question(offer + ' ', res));
        const rickValue = parseInt(rickInput, 10);

        if (isNaN(rickValue) || rickValue < 0 || rickValue >= range) { 
            throw new Error(`Invalid input: must be integer between 0 and ${range - 1}`);
        }

        const final = (mortyValue + rickValue) % range;

        this.history.push({
            counter: this.counter,
            mortyValue,
            rickValue, 
            final,
            key: key.toString('hex').toUpperCase(),
            range,
        })

        return final;
    }

    revealAll() { 
        this.history.forEach(item => {
            console.log(`Morty: Aww man, my ${item.counter} random value is ${item.mortyValue}`);
            console.log(`Morty: KEY${item.counter} = ${item.key}`);
            console.log(`Morty: So the ${item.counter} fair number is (${item.mortyValue} + ${item.rickValue}) % ${item.range} = ${item.final}`)
        });
    }

    reset() { 
        this.history = [];
        this.counter = 0;
    }
}