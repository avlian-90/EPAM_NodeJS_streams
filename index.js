import { createReadStream, createWriteStream } from "node:fs";
import { Transform } from "node:stream";

function implementOperations(inputFilePath, outputFilePath, operation) {
    
    const readableStream = createReadStream(inputFilePath);
    const writeableStream = createWriteStream(outputFilePath);

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            let transformedData = "";

            if (operation === "uppercase") {
                transformedData = chunk.toString().toUpperCase();
            } else if (operation === "lowercase") {
                transformedData = chunk.toString().toLowerCase();
            } else if (operation === "reverse") {
                transformedData = chunk.toString().split("").reverse().join("");
            } else {
                console.error("Invalid operation!");
                process.exit();
            }

            this.push(transformedData);
            callback();
        }
    })

    readableStream.on("error", (error) => {
        console.error(error);
    });

    writeableStream.on("error", (error) => {
        console.error(error);
    });

    transformStream.on("error", (error) => {
        console.error(error);
    });

    readableStream.pipe(transformStream).pipe(writeableStream);
    
}

const [, , inputFilePath, outputFilePath, operation] = process.argv;

if (!(inputFilePath && outputFilePath && operation)) {
    console.error("Missing arguments!");
    process.exit();
}

implementOperations(inputFilePath, outputFilePath, operation);