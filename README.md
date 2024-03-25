# Latex auto release

# How to use:

- Enable github 2FA (required to run github actions)

- Create .github/workflows/main.yml

```
on:
  push:
    tags:
        - "*"

jobs:
build-latex:
    runs-on: ubuntu-latest
    name: Build latex
    steps:
    - name: 🚚 Get latest code
        uses: actions/checkout@v3
    

    - name: 📄🔍 Build latex and release
        uses: rn7cvj-dvfu/3-semester-web-lab-5@main
        with:
        files: <Files list>
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
``` 

- Replace <Files list>, by files which you want to build for release, separated by ,

- Create git tag

```
git tab <tag-name>
```

- Push tags to github

```
git push origin --tags
```

- Release will be automatically create with tag name 
