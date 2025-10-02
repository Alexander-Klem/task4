import Table from 'cli-table3'

export default class Statistics { 
    constructor() {
        this.switchedRounds = 0;
        this.stayedRounds = 0;
        this.switchedWins = 0;
        this.stayedWins = 0;
    }

    statistics(pExactSwitch, pExactStay) { 
        let table = new Table({
            head: ['Game results', 'Rick switched', 'Rick stayed'],
            style: {
                head: [],
                border: [],
            },
            colWidths: [21, 25, 25],
        })

        table.push(
            ['Rounds',
                this.switchedRounds.toString().padStart(13),
                this.stayedRounds.toString().padStart(11)],
            ['Wins',
                this.switchedWins.toString().padStart(13),
                this.stayedWins.toString().padStart(11),
            ],
            ['P (estimate)',
                (this.switchedRounds ? (this.switchedWins / this.switchedRounds).toFixed(3) : '?').padStart(13),
                (this.stayedRounds ? (this.stayedWins / this.stayedRounds).toFixed(3) : '?').padStart(11),
            ],
            ['P (exact)',
                pExactSwitch.toFixed(3).padStart(13),
                pExactStay.toFixed(3).padStart(11)
            ],
        );

        console.log('\n GAME STATS');
        console.log(table.toString());
    }

    record(switched, win) { 
        if (switched) {
            this.switchedRounds++;
            if (win) {
                this.switchedWins++;
            }
        } else { 
            this.stayedRounds++;
            if (win) { 
                this.stayedWins++;
            }
        }
    }
}