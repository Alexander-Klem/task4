export default class Arguments { 
    constructor(args) {
        if (args.length !== 5) {
            throw new Error('Incorrect number of arguments')
        }

        this.boxCount = parseInt(args[2], 10); 
        this.mortyPath = args[3]; 
        this.mortyClass = args[4];

        if (isNaN(this.boxCount) || this.boxCount < 3) { 
            throw new Error('Number of boxes must be greater than 2');
        }

        if (!this.mortyPath || !this.mortyClass) { 
            throw new Error('File path or class name can`t be empty')
        }
    }
}