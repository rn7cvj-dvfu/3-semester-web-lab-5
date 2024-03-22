import * as github from '@actions/github';
import { Context as GitHubContext } from '@actions/github/lib/context';

export interface IContext { 

    readonly repo : string
    readonly owner : string
    readonly tag : string

}

export class Context implements IContext { 

    private context : GitHubContext

    constructor() {
        this.context = github.context
    }

    get repo() {
        return this.context.repo.repo;
    }

    
    get owner() {
        return this.context.repo.owner;
    }

    get tag() { 

        const ref = this.context.ref
        const tagPath = "refs/tags/"
        
        if (ref && ref.startsWith(tagPath)) {
            return ref.substr(tagPath.length, ref.length)
        }

        throw Error("No tag found in ref or input!")
    }

}