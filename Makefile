build:
	tsc ./src/Main.ts --outDir build
	ncc build build/Main.js -o action
