import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

export default class MortyLoader { 
    static async load(mortyPath, className) {
        try {
            const fileName = fileURLToPath(import.meta.url);
            const dirName = path.dirname(fileName);
            const fullPath = path.resolve(dirName,mortyPath);
            
            const moduleURL = pathToFileURL(fullPath).href;

            const module = await import(moduleURL);

            if (!module.default) {
                throw new Error(`Class ${className} not found in ${mortyPath}`);
            }
            return module.default;
        } catch (error) { 
            throw new Error(`Failed to load Morty from ${mortyPath}: ${error.message}`);
        }
    }
}