echo "Run prettier"
prettier ./build/. --write

echo "Run typescript compiler" 
tsc ./src/Main.ts --outDir build

echo "Run ncc to build the action"
ncc build build/Main.js -o actions