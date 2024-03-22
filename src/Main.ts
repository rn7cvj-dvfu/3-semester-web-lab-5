import * as core from '@actions/core';

import { Inputs ,  CoreInputs } from "./Inputs";
import { setup } from './Setup';


async function run() {
    
    try { 

        await setup()

        const inputs : Inputs = new CoreInputs()
        
        console.log(`Loaded files: ${inputs.files}`)

    }catch (error) { 
        core.setFailed(error.toString());
    }

}


run()

