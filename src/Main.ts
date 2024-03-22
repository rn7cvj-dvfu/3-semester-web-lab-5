import * as core from '@actions/core';

import { Inputs ,  CoreInputs } from "./Inputs";
import { setup } from './Setup';
import { ILatexFile , LatexFile } from './LatexFile';

async function run() {
    
    try { 

        await setup()

        const inputs : Inputs = new CoreInputs()

        const latexFiles : ILatexFile[] = inputs.files.map( (filePath) => new LatexFile(filePath) )

        latexFiles.forEach((latexFile) =>latexFile.build() )

    }catch (error) { 
        core.setFailed(error.toString());
    }

}


run()

