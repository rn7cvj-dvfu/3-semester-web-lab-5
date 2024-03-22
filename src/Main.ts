import * as core from '@actions/core';
import * as github from '@actions/github';

import { Inputs ,  CoreInputs } from "./Inputs";
import { setup } from './Setup';
import { ILatexFile , LatexFile } from './LatexFile';
import { Releaser } from './Releaser'; 
import { Context } from './Context';

async function run() {
    
    try { 

        await setup()

        const inputs : Inputs = new CoreInputs()

        // Generate latex files
        const latexFiles : ILatexFile[] = inputs.files.map( (filePath) => new LatexFile(filePath) )
        latexFiles.forEach((latexFile) =>latexFile.build() )

        // const outputFiles : string[] = latexFiles.map((latexFile) => latexFile.outputFilePath)


        // Create relese
        const git = github.getOctokit(inputs.repoToken)
        const context = new Context();
        const resleaser : Releaser = new Releaser(git , context , [] )

        await resleaser.perform()


    }catch (error) { 
        core.setFailed(error.toString());
    }

}


run()

