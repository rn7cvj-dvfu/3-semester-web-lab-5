echo "Run prettier"
prettier ./src/. --write

echo "-----------------------"

echo "Run typescript compiler" 
tsc ./src/Main.ts --outDir build

echo "-----------------------"

echo "Run ncc to build the action"
ncc build build/Main.js -o action