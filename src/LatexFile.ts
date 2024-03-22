import * as fs from "fs";

// TODO:
// replace to ts import
const latex = require("node-latex");

export interface ILatexFile {
  build(): Promise<void>;
  readonly outputFilePath: string;
}

export class LatexFile implements ILatexFile {
  private inputPath: string;
  private outputPath: string;
  private input: fs.ReadStream;
  private output: fs.WriteStream;

  constructor(filePath: string) {
    this.inputPath = filePath
    this.outputPath = filePath.replace(".tex", ".pdf")

    this.input = fs.createReadStream(this.inputPath)
    this.output = fs.createWriteStream(this.outputPath); 
    
    console.log(`Loaded ${filePath}`);
  }

  get outputFilePath() {
    return this.outputPath;
  }

  public async build(): Promise<void> {
    const pdf = latex(this.input);

    pdf.pipe(this.output);

    console.log(`Build ${this.inputPath} to ${this.outputPath}`);
  }
}
